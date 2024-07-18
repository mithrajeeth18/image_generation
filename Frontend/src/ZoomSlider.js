import React from 'react';
import './ZoomSlider.css';

const ZoomSlider = ({ zoom, setZoom }) => {
  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div className="zoom-slider">
      <input
        type="range"
        min="10"
        max="200"
        value={zoom}
        onChange={handleZoomChange}
      />
      <span>{zoom}%</span>
    </div>
  );
};

export default ZoomSlider;
