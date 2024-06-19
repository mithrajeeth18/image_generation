import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faShapes, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { fabric } from 'fabric';

function Sidebar({ textProperties, setTextProperties, canvas }) {
  const [isTextSettingsOpen, setIsTextSettingsOpen] = useState(false);
  const [isShapeSettingsOpen, setIsShapeSettingsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextProperties((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const fonts = ["Arial", "Verdana", "Poppins", "Times New Roman", "Courier New", "Lucida Console", "Georgia", "Tahoma", "Impact", "Comic Sans MS"];

  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', handleDeselection);
    }
    return () => {
      if (canvas) {
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', handleDeselection);
      }
    };
  }, [canvas]);

  useEffect(() => {
    if (selectedText) {
      selectedText.set({
        fill: textProperties.color,
        fontSize: textProperties.fontSize,
        fontFamily: textProperties.fontFamily,
        fontWeight: textProperties.fontWeight,
        fontStyle: textProperties.fontStyle,
        textDecoration: textProperties.textDecoration,
      });
      canvas.bringToFront(selectedText); // Ensure the text stays on top
      canvas.renderAll();
    }
  }, [textProperties]);

  const handleSelection = (e) => {
    const activeObject = e.target;
    if (activeObject && activeObject.type === 'i-text') {
      setSelectedText(activeObject);
      canvas.bringToFront(activeObject); // Ensure the selected text stays on top
    }
  };

  const handleDeselection = () => {
    setSelectedText(null);
  };

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText('Enter text...', {
        left: 100,
        top: 100,
        fill: textProperties.color,
        fontSize: textProperties.fontSize,
        fontFamily: textProperties.fontFamily,
        fontWeight: textProperties.fontWeight,
        fontStyle: textProperties.fontStyle,
        textDecoration: textProperties.textDecoration,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.bringToFront(text); // Ensure the text stays on top
      setSelectedText(text);
      canvas.renderAll();
    }
  };

  const addShape = (shape) => {
    if (canvas) {
      let shapeObject;
      switch (shape) {
        case 'rectangle':
          shapeObject = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 60,
            height: 70,
          });
          break;
        case 'circle':
          shapeObject = new fabric.Circle({
            left: 100,
            top: 100,
            fill: 'blue',
            radius: 50,
          });
          break;
        case 'triangle':
          shapeObject = new fabric.Triangle({
            left: 100,
            top: 100,
            fill: 'green',
            width: 60,
            height: 70,
          });
          break;
        case 'line':
          shapeObject = new fabric.Line([50, 100, 200, 200], {
            left: 100,
            top: 100,
            stroke: 'black',
          });
          break;
        default:
          shapeObject = null;
      }
      if (shapeObject) {
        canvas.add(shapeObject);
        canvas.setActiveObject(shapeObject);
        canvas.bringToFront(shapeObject); // Ensure the shape stays on top
        canvas.renderAll();
      }
    }
  };

  const applyStyle = (style, value) => {
    if (selectedText) {
      selectedText.set(style, value);
      canvas.bringToFront(selectedText); // Ensure the selected text stays on top
      canvas.renderAll();
    }
  };

  const toggleTextSettings = () => {
    setIsTextSettingsOpen(!isTextSettingsOpen);
    if (!isTextSettingsOpen) {
      addText(); // Add text to the canvas when the button is clicked
    }
  };

  const toggleShapeSettings = () => {
    setIsShapeSettingsOpen(!isShapeSettingsOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={toggleTextSettings}>
          <FontAwesomeIcon icon={faTextWidth} className="sidebar-icon" />
          <span>Text</span>
        </div>
        {isTextSettingsOpen && (
          <div className="text-settings-window">
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
              <div className="font-size-group">
                <label>
                  Size:
                  <input
                    type="number"
                    name="fontSize"
                    value={textProperties.fontSize}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="color-group">
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
              <button className="icon-button" onClick={() => applyStyle('fontWeight', textProperties.fontWeight === 'bold' ? 'normal' : 'bold')}>
                <FontAwesomeIcon icon={faBold} className="icon" />
              </button>
              <button className="icon-button" onClick={() => applyStyle('fontStyle', textProperties.fontStyle === 'italic' ? 'normal' : 'italic')}>
                <FontAwesomeIcon icon={faItalic} className="icon" />
              </button>
              <button className="icon-button" onClick={() => applyStyle('textDecoration', textProperties.textDecoration === 'underline' ? 'none' : 'underline')}>
                <FontAwesomeIcon icon={faUnderline} className="icon" />
              </button>
            </div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleShapeSettings}>
          <FontAwesomeIcon icon={faShapes} className="sidebar-icon" />
          <span>Shape</span>
        </div>
        {isShapeSettingsOpen && (
          <div className="shape-settings-window">
            <button className="shape-button" onClick={() => addShape('rectangle')}>Rectangle</button>
            <button className="shape-button" onClick={() => addShape('circle')}>Circle</button>
            <button className="shape-button" onClick={() => addShape('triangle')}>Triangle</button>
            <button className="shape-button" onClick={() => addShape('line')}>Line</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
