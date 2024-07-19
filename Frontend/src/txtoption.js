// src/components/TextOptions.js

import React from "react";
import "./TextOptions.css"; // Create and import a CSS file for styling

const TextOptions = ({ onAddText }) => {
  return (
    <div className="text-options">
      <div className="text-option heading" onClick={() => onAddText("heading")}>
        Add a heading
      </div>
      <div
        className="text-option subheading"
        onClick={() => onAddText("subheading")}
      >
        Add a subheading
      </div>
      
    </div>
  );
};

export default TextOptions;
