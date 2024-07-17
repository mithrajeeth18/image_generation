// ColorPicker.js
import React, { useState } from 'react';

const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState('#ffffff');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  const handleHexChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
  };

  const applyHexColor = () => {
    onColorChange(color);
  };

  return (
    
    <div className="color-picker">
      
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
      />
      <input
        type="text"
        value={color}
        onChange={handleHexChange}
        placeholder="#000000"
      />
      <button onClick={applyHexColor}>Apply </button>
    </div>
  );
};

export default ColorPicker;
