# KodeKurrent-Rabitt.Ai

![Image](https://github.com/user-attachments/assets/11a8af07-c330-4bcb-b2b9-e56508758e43)

## Overview
KodeKurrent-Rabitt.Ai is a project designed to solve handwritten math equations. The system leverages a multi-step pipeline that involves various technologies and models for image processing, OCR, LaTeX conversion, and inference.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- Converts handwritten math equations from images to LaTeX format.
- Uses Qwen vl 2b instruct for OCR and LaTeX conversion.
- Converts LaTeX to string format.
- Utilizes DeepSeek 7b math instruct 4b quantized for inference.
- Provides solutions to the math equations.

## Architecture
The pipeline consists of the following steps:
1. **Image Input**: Input an image containing a handwritten math equation.
2. **OCR and LaTeX Conversion**: Use Qwen vl 2b instruct model to perform OCR on the image and convert it to LaTeX format.
3. **String Conversion**: Convert the LaTeX format into a string.
4. **Inference**: Use DeepSeek 7b math instruct 4b quantized model to perform inference and solve the math equation.
5. **Solution Output**: Output the solution to the math equation.

## Installation
To install and run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/agastya3636/KodeKurrent-Rabitt.Ai.git
    ```
2. Navigate to the project directory:
    ```sh
    cd KodeKurrent-Rabitt.Ai
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
Provide instructions and examples for using your project:

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Upload an image containing a handwritten math equation.
4. The system will process the image through the pipeline and display the solution.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (e.g., `feature-branch`).
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes.
4. Commit your changes.
    ```sh
    git commit -m "Add some feature"
    ```
5. Push to the branch.
    ```sh
    git push origin feature-branch
    ```
6. Create a new Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- [Qwen vl 2b instruct](#)
- [DeepSeek 7b math instruct 4b quantized](#)
- [Other resources](#)
