import React from 'react';
import './Sidebar.css';

function PropertiesSidebar({ textProperties, setTextProperties }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextProperties((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const fonts = ["Arial", "Verdana", "Poppins", "Times New Roman", "Courier New", "Lucida Console", "Georgia", "Tahoma", "Impact", "Comic Sans MS"];

  return (
    <div className="properties-sidebar">
      <h2>Tools</h2>
      <div className="control-buttons">
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, type: 'text' }))}>
          Add Text
        </button>
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, type: 'shape' }))}>
          Add Shape
        </button>
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, type: 'line' }))}>
          Add Line
        </button>
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, action: 'download' }))}>
          Download Image
        </button>
      </div>
      <label>
        Font:
        <select
          name="fontFamily"
          value={textProperties.fontFamily}
          onChange={handleChange}
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </label>
      <div className="form-group">
        <div>
          <label>
            Font Size:
            <input
              type="number"
              name="fontSize"
              value={textProperties.fontSize}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={textProperties.color}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className="form-group">
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold' }))}>
          Bold
        </button>
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic' }))}>
          Italic
        </button>
        <button className="control-button" onClick={() => setTextProperties(prev => ({ ...prev, textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline' }))}>
          Underline
        </button>
      </div>
      <label>
        Background Color:
        <input
          type="color"
          name="backgroundColor"
          value={textProperties.backgroundColor}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default PropertiesSidebar;
