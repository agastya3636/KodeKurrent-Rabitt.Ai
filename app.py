from flask import Flask, request, jsonify
import torch
import os
from PIL import Image
from pylatexenc.latex2text import LatexNodes2Text
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
    Qwen2VLForConditionalGeneration,
    AutoProcessor
)
from qwen_vl_utils import process_vision_info

app = Flask(__name__)

#############################
# Utility functions
#############################

def convert_latex_to_plain_text(latex_string):
    """Converts LaTeX to plain text."""
    converter = LatexNodes2Text()
    return converter.latex_to_text(latex_string)

#############################
# Load models at startup
#############################

print("Loading OCR Model...")
model_ocr = Qwen2VLForConditionalGeneration.from_pretrained(
    "prithivMLmods/Qwen2-VL-OCR-2B-Instruct",
    torch_dtype="auto",
    device_map="auto"
)
processor_ocr = AutoProcessor.from_pretrained("prithivMLmods/Qwen2-VL-OCR-2B-Instruct")

print("Loading LLM Model...")
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)
model_name = "deepseek-ai/deepseek-math-7b-instruct"
tokenizer_llm = AutoTokenizer.from_pretrained(model_name)
model_llm = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config,
    device_map="auto"
)
tokenizer_llm.pad_token = tokenizer_llm.eos_token

print("Models Loaded!")

#############################
# OCR & Expression Solver
#############################

def img_2_text(image):
    """Extracts LaTeX expression from an image using the OCR model."""
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "image", "image": image},
                {"type": "text", "text": "Derive the LaTeX expression from the image given"}
            ],
        }
    ]
    
    text = processor_ocr.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True
    )
    image_inputs, video_inputs = process_vision_info(messages)
    
    inputs = processor_ocr(
        text=[text],
        images=image_inputs,
        videos=video_inputs,
        padding=True,
        return_tensors="pt",
    ).to(model_ocr.device)

    generated_ids = model_ocr.generate(**inputs, max_new_tokens=512)
    generated_ids_trimmed = [
        out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
    ]
    
    output_text = processor_ocr.batch_decode(
        generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False
    )
    return output_text[0].split('<|im_end|>')[0]

def expression_solver(expression):
    """Solves or simplifies a mathematical expression using LLM."""
    device = next(model_llm.parameters()).device
    prompt = f"""You are a helpful math assistant. Please analyze the problem carefully and provide a step-by-step solution. 
- If the problem is an equation, solve for the unknown variable(s). 
- If it is an expression, simplify it fully. 
- If it is a word problem, explain how you arrive at the result.
- Output final value in a <ANS> </ANS> tag.

Problem: {expression}
Answer:
"""
    inputs = tokenizer_llm(prompt, return_tensors="pt").to(device)
    outputs = model_llm.generate(
        **inputs,
        max_new_tokens=512,
        do_sample=True,
        top_p=0.95,
        temperature=0.7
    )
    return tokenizer_llm.decode(outputs[0], skip_special_tokens=True)

#############################
# Flask API Route
#############################

@app.route('/predict-math', methods=['POST'])
def process_images():
    """Handles image uploads, performs OCR, and solves expressions."""
    if 'images' not in request.files:
        return jsonify({"error": "No images uploaded"}), 400
    
    files = request.files.getlist('images')
    results = []

    for file in files:
        image = Image.open(file)
        ocr_text = img_2_text(image)
        expression = convert_latex_to_plain_text(ocr_text)
        solution = expression_solver(expression)

        results.append({
            "Filename": file.filename,
            "OCR_LaTeX": ocr_text,
            "Converted_Expression": expression,
            "Solution": solution
        })

    return jsonify({"results": results})

#############################
# Run Flask App
#############################

if __name__ == '__main__':
    app.run(debug=True, port=5000)
