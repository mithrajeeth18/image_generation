import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faShapes, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { fabric } from 'fabric';

const ShapeIcon = ({ shape, onClick }) => (
  <div className="shape-button" onClick={onClick}>
    {shape === 'rectangle' && (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path d="M0 0h64v64H0V0"></path>
      </svg>
    )}
    {shape === 'circle' && (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <circle cx="32" cy="32" r="32"></circle>
      </svg>
    )}
    {shape === 'triangle' && (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <polygon points="32,0 64,64 0,64"></polygon>
      </svg>
    )}
    {shape === 'line' && (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <line x1="0" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="4"></line>
      </svg>
    )}
    {shape === 'diamond' && (
      <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <polygon points="32,0 64,32 32,64 0,32"></polygon>
      </svg>
    )}
  </div>
);

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
        case 'diamond':
          shapeObject = new fabric.Polygon([
            { x: 32, y: 0 },
            { x: 64, y: 32 },
            { x: 32, y: 64 },
            { x: 0, y: 32 }
          ], {
            left: 100,
            top: 100,
            fill: 'purple',
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
      if (style === 'fontWeight') {
        const newFontWeight = selectedText.fontWeight === 'bold' ? 'normal' : 'bold';
        selectedText.set('fontWeight', newFontWeight);
      } else if (style === 'fontStyle') {
        const newFontStyle = selectedText.fontStyle === 'italic' ? 'normal' : 'italic';
        selectedText.set('fontStyle', newFontStyle);
      } else if (style === 'textDecoration') {
        const newTextDecoration = selectedText.textDecoration === 'underline' ? 'none' : 'underline';
        selectedText.set('textDecoration', newTextDecoration);
      } else {
        selectedText.set(style, value);
      }
      canvas.bringToFront(selectedText); // Ensure the selected text stays on top
      canvas.renderAll();
    }
  };

  const toggleTextSettings = () => {
    setIsTextSettingsOpen(!isTextSettingsOpen);
    if (!isTextSettingsOpen) {
      setIsShapeSettingsOpen(false); // Close shape settings if open
      addText(); // Add text to the canvas when the button is clicked
    }
  };

  const toggleShapeSettings = () => {
    setIsShapeSettingsOpen(!isShapeSettingsOpen);
    if (!isShapeSettingsOpen) {
      setIsTextSettingsOpen(false); // Close text settings if open
    }
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
            <div className="shape-row">
              <ShapeIcon shape="rectangle" onClick={() => addShape('rectangle')} />
              <ShapeIcon shape="circle" onClick={() => addShape('circle')} />
            </div>
            <div className="shape-row">
              <ShapeIcon shape="triangle" onClick={() => addShape('triangle')} />
              <ShapeIcon shape="line" onClick={() => addShape('line')} />
            </div>
            <div className="shape-row">
              <ShapeIcon shape="diamond" onClick={() => addShape('diamond')} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
