import React, { useState } from "react";
import "./style/ImageUpload.css"; // Adjust path if necessary

const ImageUpload = ({ endpoint }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [responseData, setResponseData] = useState(""); // State for backend response

  // Handle the file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the image
      setMessage(""); // Clear any previous messages
      setIsError(false); // Reset error state
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(""); // Clear the preview URL
    setMessage(""); // Clear the message when removing
    setResponseData(""); // Clear previous backend response
  };

  // Submit the image to the backend server
  // const handleSubmit = async (file) => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const response = await fetch(`/api/${endpoint}`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setResponseData(data["json"]["parts"][0]["text"]); // Store the backend response data
  //     setMessage("Image uploaded successfully!");
  //     setIsError(false);
  //   } catch (error) {
  //     setMessage("Failed to upload image.");
  //     setIsError(true);
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Backend Response:", data); // Debugging

      // Fix: Extracting message correctly
      if (Array.isArray(data) && data.length > 0 && data[0].message) {
        setResponseData(data[0].message);
      } else {
        setResponseData("Unexpected response format");
      }

      setMessage("Image uploaded successfully!");
      setIsError(false);
    } catch (error) {
      setMessage("Failed to upload image.");
      setIsError(true);
      console.error("Error:", error);
    }
  };

  return (
    <div className="content-container">
      {/* Image Upload Section */}
      <div className="image-upload-container">
        <div className={`upload-area ${!image ? "empty" : ""}`}>
          {!image ? (
            <div className="choose-file-message">No Image file is chosen.</div>
          ) : (
            <>
              <button className="remove-button" onClick={handleRemoveImage}>
                Remove Image
              </button>
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
              <button className="upload-button" onClick={() => handleSubmit(image)}>
                Upload Image
              </button>
            </>
          )}

          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the input element
            />
            <label htmlFor="file-upload" className="file-input-label">
              {image ? "Change the file" : "Choose a file to upload"}
            </label>
          </div>
        </div>

        {message && (
          <p className={isError ? "error-message" : "success-message"}>
            {message}
          </p>
        )}
      </div>

      {/* Response Section */}
      {responseData && (
        <div className="response-data">
          <h3 style={{ color: "green" }}
          >Response from Backend:</h3>
          <pre className="response-text">{responseData.replace(/`/g, "")}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
