
from flask import Flask, request, jsonify
from PIL import Image
import torch
from torchvision import models, transforms
from transformers import AutoTokenizer, AutoModel
import json
import io
from io import BytesIO
import requests
import os
from transformers import BlipProcessor, BlipForConditionalGeneration
from pymongo import MongoClient
from pydantic import BaseModel, validator
from typing import List
from datetime import datetime
from flask import Flask
from flask_cors import CORS
import re
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

gemini_password=os.getenv('GeminiPassword')
app = Flask(__name__)






@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    try:
        file = request.files['image']
        img_bytes = file.read()  # Read the image file as bytes
        image_tensor = process_classification_image(img_bytes)  # Preprocess the image
        
        # Make prediction
        with torch.no_grad():
            outputs = classification_model(image_tensor)
            _, predicted = torch.max(outputs, 1)
        
        # Map predicted index to the class label
        class_idx = predicted.item()
        class_name = class_labels[class_idx]
        try:
            demore = extract_details(class_name)  # Assuming extract_details is defined
            
            
        except Exception as e:
            print(f"Error in extract_details: {str(e)}")
            return jsonify({'error': f"Error in extract_details: {str(e)}"}), 500
        
        response = {
            'json': {
                'parts': [
                    {
                        'text': f"""{demore}""" 
                    }
                ]
            },
            'result': class_name
        }

        
        return (response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# http://localhost:5173/api/predict-math

@app.route('/predict-math',methods=['POST'])
def test():
    return jsonify({"message": "Mind your own bussiness!"}, 200)

# Main entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
