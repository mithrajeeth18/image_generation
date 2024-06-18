import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  onAddText,
  onAddShape,
  onAddLine,
  onDownloadImage,
  onFontChange,
  onFontSizeChange,
  onColorChange,
  selectedFont,
  selectedFontSize,
}) => {
  const handleColorChange = (e) => {
    const color = e.target.value;
    onColorChange(color);
  };

  return (
    <div className="sidebar">
      <h3>Tools</h3>
      <button className="sidebar-button" onClick={onAddText}>
        Add Text
      </button>
      <button className="sidebar-button" onClick={onAddShape}>
        Add Shape
      </button>
      <button className="sidebar-button" onClick={onAddLine}>
        Add Line
      </button>
      <button className="sidebar-button" onClick={onDownloadImage}>
        Download Image
      </button>

      <div className="font-controls">
        <label htmlFor="fontSelect">Font:</label>
        <select id="fontSelect" value={selectedFont} onChange={onFontChange}>
          <option value="Poppins">Poppins</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more fonts as needed */}
        </select>
      </div>
      <div className="font-size-controls">
        <label htmlFor="fontSizeInput">Font Size:</label>
        <input
          type="number"
          id="fontSizeInput"
          value={selectedFontSize}
          onChange={onFontSizeChange}
        />
      </div>

      <div className="color-controls">
        <label htmlFor="colorPicker">Color:</label>
        <input
          type="color"
          id="colorPicker"
          defaultValue="#ffffff"
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
