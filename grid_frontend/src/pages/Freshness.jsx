import React from "react";
import "../components/style/Freshness.css"; // Ensure correct path
import ImageUpload from "../components/ImageUpload.jsx"; // Image upload component

const Freshness = () => {
  return (
    <div className="freshness-container" style={{width:'90vw', height:'100vh'}}>
      {/* Description Section on Top */}
      <div className="description-container">
        <h2>Handwritten Math Expression Recognition</h2>
        <p>
          Upload a handwritten math equation, and our AI will recognize and
          solve it instantly!
        </p>
      </div>

      {/* Main Content: Image Upload + Response Section */}
      <div className="main-content">
        <ImageUpload endpoint="predict-math" />
      </div>
    </div>
  );
};

export default Freshness;
