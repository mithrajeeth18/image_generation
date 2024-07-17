// src/components/LogosPanel.js

import React from "react";
import "./LogosPanel.css"; // Create and import a CSS file for styling

const LogosPanel = ({ logos, onSelectLogo }) => {
  return (
    <div className="logos-panel">
      {logos.map((logo, index) => {
        // Extract the file name from the logo URL
        const fileName = logo.split("/").pop().split(".")[0];
        return (
          <div
            key={index}
            className="logo-item"
            data-hover-text={fileName}
            onClick={() => onSelectLogo(logo)}
          >
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        );
      })}
    </div>
  );
};

export default LogosPanel;
