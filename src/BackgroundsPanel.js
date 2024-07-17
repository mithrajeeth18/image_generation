import React from 'react';
import './BackgroundsPanel.css';

const BackgroundsPanel = ({ backgrounds, onSelectBackground }) => {
  return (
    <div className="backgrounds-panel">
      {backgrounds.map((background, index) => (
        <div key={index} className="background-item" onClick={() => onSelectBackground(background)}>
          <img src={background} alt={`Background ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default BackgroundsPanel;
