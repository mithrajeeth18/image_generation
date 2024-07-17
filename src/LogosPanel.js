// src/components/LogosPanel.js

import React from 'react';
import './LogosPanel.css'; // Create and import a CSS file for styling

const LogosPanel = ({ logos, onSelectLogo }) => {
  return (
    <div className="logos-panel">
      {logos.map((logo, index) => (
        <div key={index} className="logo-item" onClick={() => onSelectLogo(logo)}>
          <img src={logo} alt={`Logo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default LogosPanel;
