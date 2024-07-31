import React, { useState, useEffect, useRef } from 'react';
import { sendPostRequest } from './api/api';
import { SketchPicker } from "react-color";
import TextOptions from "./txtoption";
import WebFont from "webfontloader";
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faShapes, faTextWidth, faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faCog, faUpload, faImages, faImage } from '@fortawesome/free-solid-svg-icons';

import { fabric } from 'fabric';
import ColorPicker from './ColorPicker';
import LogosPanel from './LogosPanel'; 

import BackgroundsPanel from './BackgroundsPanel';

import logo1 from './logos/JioCinema.png';
import logo2 from './logos/JioFiber.png';
import logo3 from './logos/JioMart.png';
import logo4 from './logos/JioSaavn.png';
import logo5 from './logos/JioTv.png';
import logo6 from './logos/JioChat.png';
import logo7 from './logos/JioCloud.png';
import logo8 from './logos/JioMags.png';
import logo9 from './logos/JioMoney.jpeg';
import logo10 from './logos/JioNet.png';
import logo11 from './logos/JioNewspaper.png';
import logo12 from './logos/JioSecurity.png';
import logo13 from "./logos/JioGames.png";
import logo14 from "./logos/IMG_3193.PNG";

import background1 from './backgrounds/image1.png';
import background2 from './backgrounds/image2.png';
import background3 from './backgrounds/image3.jpeg';
import background4 from './backgrounds/image4.jpeg';
import background5 from './backgrounds/image5.jpeg';
import background6 from './backgrounds/image6.jpeg';
import background7 from './backgrounds/image7.jpeg';
import background8 from './backgrounds/image8.png';
import { text } from '@fortawesome/fontawesome-svg-core';

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

const handleAlignText = (alignment, canvas) => {
  const paddingValue = 30; 
  const activeObject = canvas.getActiveObject();
  console.log(activeObject);
  if (activeObject && activeObject.type === 'i-text') {
    switch (alignment) {
      case 'left':
        activeObject.set({ left: paddingValue });
        break;
      case 'center':
        activeObject.set({ left: canvas.width / 2 - activeObject.width / 2 + paddingValue });
        break;
      case 'right':
        activeObject.set({ left: canvas.width - activeObject.width - paddingValue });
        break;
      case 'top':
        activeObject.set({ top: paddingValue });
        break;
      case 'bottom':
        activeObject.set({ top: canvas.height - activeObject.height - paddingValue });
        break;
      default:
        break;
    }
    canvas.renderAll();
  }
};

function Sidebar({ textProperties, setTextProperties, canvas }) {
  const [activePanel, setActivePanel] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(700);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const fileInputRef = useRef(null);
  const [count, setCount] = useState(0);
  const [selectedShape, setSelectedShape] = useState(null);
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14];
  const colorPallet = [
    "#027EA5",
    "#88DCFE",
    "#7BEAD9",
    "#700017",
    "#a80000",
    "#cd3d00",
    "#ac660c",
    "#03753c",
    "#1e7b74",
    "#0c5273",
    "#0a2885",
    "#000093",
    "#3e0084",
    "#79007f",
    "#ff6dcc",
  ];
  const backgrounds = [background1, background2 , background3, background4, background5, background6, background7, background8];

  const handleSelectLogo = (logo) => {
    if (canvas) {
      const zoomFactor = canvas.getZoom();
      fabric.Image.fromURL(logo, (img) => {
        img.set({
          left: 100 * zoomFactor,
          top: 100 * zoomFactor,
          scaleX: 0.5 * zoomFactor,
          scaleY: 0.5 * zoomFactor,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    }
  };
  
  const handleSelectBackground = (background) => {
    if (canvas) {
      fabric.Image.fromURL(background, (img) => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const zoomFactor = canvas.getZoom();
  
        // Set initial scale factors based on canvas size
        const scaleX = (canvas.width / imgWidth);
        const scaleY = (canvas.height / imgHeight);
  
        // Set the background image with initial scaling
        img.set({
          left: 0,
          top: 0,
          scaleX: scaleX,
          scaleY: scaleY,
          selectable: false,
          hasControls: false,
          hasBorders: false,
        });
  
        // Store original dimensions in canvas
        canvas.originalBackgroundImageWidth = imgWidth;
        canvas.originalBackgroundImageHeight = imgHeight;
  
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  
        // Close the backgrounds panel after selection
        setActivePanel(null);
      });
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextProperties((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
    if (selectedText) {
      selectedText.set(name, value);
      if (name === 'color') {
        selectedText.set('fill', value); // Ensure color is updated
      }
      canvas.renderAll();
    }
  };
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "JioType-Black",
          "JioType-Bold",
          "JioType-Light",
          "JioType-LightItalic",
          "JioType-Medium",
          "JioType-MediumItalic",
        ],
      },
    });
  }, []);

  const fonts = [
    "Arial",
    "Verdana",
    "Poppins",
    "Times New Roman",
    "Courier New",
    "Lucida Console",
    "Georgia",
    "Tahoma",
    "Impact",
    "Comic Sans MS",
    "JioType-Black",
    "JioType-Bold",
    "JioType-Light",
    "JioType-LightItalic",
    "JioType-Medium",
    "JioType-MediumItalic",
    // Add your custom fonts here
  ];

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

  const handleSelection = (e) => {
    const activeObject = canvas.getActiveObject();
    console.log("Active Object Selected:", activeObject.type);

    if (activeObject && activeObject.type === "i-text") {
      const selectedTextProperties = {
        id: activeObject.id,
        text: activeObject.text,
        fontSize: activeObject.fontSize,
        fill: activeObject.fill,
        left: activeObject.left,
        top: activeObject.top,
      };

      setSelectedText(activeObject);
      updateTextProperties(activeObject);
      setActivePanel('text');
    } else {
      setSelectedText(null);
      setActivePanel(null);
    }

    if(activeObject && (activeObject.type === "rect" || activeObject.type === "circle" || activeObject.type === "triangle" || activeObject.type === "line" || activeObject.type === "diamond")) {
      setSelectedShape(activeObject);
      setActivePanel('shape');
    } else {
      setSelectedShape(null);
      setActivePanel(null);
    }
  };

  const handleDeselection = () => {
    setSelectedText(null);
    setActivePanel(null);
    setSelectedShape(null);
  };

  const updateTextProperties = (textObject) => {
    setTextProperties({
      color: textObject.fill,
      fontSize: textObject.fontSize,
      fontFamily: textObject.fontFamily,
      fontWeight: textObject.fontWeight,
      fontStyle: textObject.fontStyle,
      textDecoration: textObject.textDecoration,
    });
  };

  const addText = () => {
    if (canvas) {
      setCount(count+1);
      let Textid = "TX";
      const text = new fabric.IText("Enter text...", {
        id: Textid + count,
        left: 100,
        top: 100,
        fill: textProperties.color,
        fontSize: textProperties.fontSize,
        fontFamily: textProperties.fontFamily,
        fontWeight: textProperties.fontWeight,
        fontStyle: textProperties.fontStyle,
        textDecoration: textProperties.textDecoration,
        hasControls: false,
        hasBorders: true,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
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
        canvas.renderAll();
      }
    }
  };

  const applyStyle = (style) => {
    if (selectedText) {
      let newValue;
      let newfont;
      switch (style) {
        case "fontWeight":
          newValue = selectedText.fontWeight === "bold" ? "normal" : "bold";
          selectedText.set("fontWeight", newValue);
          break;
        case "fontStyle":
          newValue = selectedText.fontStyle === "italic" ? "normal" : "italic";
          selectedText.set("fontStyle", newValue);
          break;
        case "textDecoration":
          newValue = selectedText.textDecoration.includes("underline")
            ? selectedText.textDecoration.replace("underline", "")
            : `${selectedText.textDecoration} underline`;
          selectedText.set("textDecoration", newValue.trim());
          break;
        case "H1":
          selectedText.set("fontSize", 40);
        
          newfont = selectedText.fontFamily = "JioType-Black";
          selectedText.set("fontFamily",newfont);
         
          break;
          
        case "H2":
          selectedText.set("fontSize", 30);
          newfont = selectedText.fontFamily = "JioType-Medium";
          selectedText.set("fontFamily", newfont);
          
          break;
        case "H3":
          selectedText.set("fontSize", 16);
          newfont = selectedText.fontFamily = "JioType-Medium";
          selectedText.set("fontFamily", newfont);
           
          break;
        default:
          break;
      }
      canvas.renderAll();
    }
  };


  let clonedObject = null;

  const handleCopy = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        clonedObject = fabric.util.object.clone(activeObject);
        clonedObject.set({
          left: activeObject.left + 10,
          top: activeObject.top + 10,
        });
      }
    }
  };

  const handlePaste = () => {
    if (canvas && clonedObject) {
      const clonedInstance = fabric.util.object.clone(clonedObject);
      canvas.add(clonedInstance);
      canvas.setActiveObject(clonedInstance);
      canvas.renderAll();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedText || selectedShape) {
        if (e.metaKey || e.ctrlKey) {
          switch (e.key.toLowerCase()) {
            case "c":
              e.preventDefault();
              handleCopy();
              break;
            case "v":
              //e.preventDefault();
              handlePaste();
              break;
            default:
              break;
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedText, handleCopy, handlePaste]);

  useEffect(() => {
    const handleCanvasClick = (e) => {
      const { offsetX, offsetY } = e;
      const target = canvas.findTarget(e, true);
      if (!target) {
        setActivePanel(null);
      }
    };

    if (canvas) {
      canvas.on("mouse:down", handleCanvasClick);
    }

    return () => {
      if (canvas) {
        canvas.off("mouse:down", handleCanvasClick);
      }
    };
  }, [canvas]);

  const toggleTextSettings = () =>
  {
    
    setActivePanel(activePanel === 'text' ? null : 'text');
    
  };
 

  const toggleShapeSettings = () => {
    setActivePanel(activePanel === 'shape' ? null : 'shape');
  };

  const handleCustomize = () => {
    setActivePanel(activePanel === 'customize' ? null : 'customize');
  };

  const toggleLogosPanel = () => {
    setActivePanel(activePanel === 'logos' ? null : 'logos');
  };

  const toggleBackgroundsPanel = () => {
    setActivePanel(activePanel === 'backgrounds' ? null : 'backgrounds');
  };

  const handleUploads = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResizeCanvas = () => {
    if (canvas) {
      const newWidth = canvasWidth;
      const newHeight = canvasHeight;
      const zoomFactor = canvas.getZoom();
  
      // Set new canvas dimensions
      canvas.setWidth(newWidth);
      canvas.setHeight(newHeight);
  
      // Adjust all objects on the canvas
      canvas.getObjects().forEach((obj) => {
        obj.scaleX *= newWidth / canvas.width;
        obj.scaleY *= newHeight / canvas.height;
        obj.left *= newWidth / canvas.width;
        obj.top *= newHeight / canvas.height;
        
        obj.setCoords();
      });
  
      // Get the background image from canvas
      const backgroundImage = canvas.backgroundImage;
      if (backgroundImage) {
        const scaleX = (newWidth / canvas.originalBackgroundImageWidth) * zoomFactor;
        const scaleY = (newHeight / canvas.originalBackgroundImageHeight) * zoomFactor;
  
        backgroundImage.set({
          scaleX: scaleX,
          scaleY: scaleY,
        });
  
        canvas.renderAll();
      }
    }
  };
  
  
  

  const handleBackgroundColorChange = (color) => {
    if (canvas) {
      if (color.startsWith('linear-gradient')) {
        const gradientRect = new fabric.Rect({
          left: 0,
          top: 0,
          width: canvas.getWidth(),
          height: canvas.getHeight(),
          selectable: false,
          hoverCursor: 'default'
        });
        gradientRect.setGradient('fill', {
          type: 'linear',
          x1: 0,
          y1: 0,
          x2: gradientRect.width,
          y2: 0,
          colorStops: color.match(/#\w{6}/g).reduce((acc, color, index, array) => {
            acc[index / (array.length - 1)] = color;
            return acc;
          }, {})
        });
        canvas.clear();
        canvas.add(gradientRect);
        canvas.sendToBack(gradientRect);
        canvas.renderAll();
      } else {
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      handleFile(file);
    });
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fabric.Image.fromURL(e.target.result, (img) => {
            img.set({
              left: 100,
              top: 100,
              scaleX: 0.5,
              scaleY: 0.5,
              selectable: true,
              hasControls: true,
              hasBorders: true,
            });
            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
          });
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert("This is not an Image File!");
      }
    }
  };

  

 

  useEffect(() =>
  {
    
    handleResizeCanvas();

  }, [canvasWidth, canvasHeight]);
  


  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {/* <div className="sidebar-item" onClick={toggleShapeSettings}>
          <FontAwesomeIcon icon={faShapes} className="sidebar-icon" />
          <span>Shape</span>
        </div>
        {activePanel === "shape" && (
          <div className="shape-settings-window">
            <div className="shape-row">
              <ShapeIcon
                shape="rectangle"
                onClick={() => addShape("rectangle")}
              />
              <ShapeIcon shape="circle" onClick={() => addShape("circle")} />
            </div>
            <div className="shape-row">
              <ShapeIcon
                shape="triangle"
                onClick={() => addShape("triangle")}
              />
              <ShapeIcon shape="line" onClick={() => addShape("line")} />
            </div>
            <div className="shape-row">
              <ShapeIcon shape="diamond" onClick={() => addShape("diamond")} />
            </div>
          </div>
        )} */}
        <div className="sidebar-item" onClick={handleCustomize}>
          <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
          <span>Templates</span>
        </div>
        {activePanel === "customize" && (
          <div className="customize-settings-window">
            <div className="defaultbanner">
              <button
                className="btn"
                data-hover-text="1184x520"
                onClick={(e) => {
                  setCanvasWidth(1184);
                  setCanvasHeight(520);
                }}
              >
                Web H
              </button>
              <button
                className="btn"
                data-hover-text="584x720"
                onClick={(e) => {
                  setCanvasWidth(584);
                  setCanvasHeight(720);
                }}
              >
                Web V
              </button>
              <br></br>
              <button
                data-hover-text="290x116"
                className="btn"
                onClick={(e) => {
                  setCanvasWidth(290);
                  setCanvasHeight(116);
                }}
              >
                Mobile H
              </button>
              <button
                className="btn"
                data-hover-text="200x250"
                onClick={(e) => {
                  setCanvasWidth(200);
                  setCanvasHeight(250);
                }}

                //               290x116

                // 200x250

                // 312x447
              >
                Mobile V
              </button>
              <button
                className="btn"
                data-hover-text="312x447"
                onClick={(e) => {
                  setCanvasWidth(312);
                  setCanvasHeight(447);
                }}
              >
                Mobile V2
              </button>
            </div>
            <label>
              Width:
              <input
                type="number"
                value={canvasWidth}
                onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={canvasHeight}
                onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
              />
            </label>
            <button className="resize-button" onClick={handleResizeCanvas}>
              Resize Canvas
            </button>
            <div className="color-picker">
              <label>Background color:</label>
              <div className="color-options">
                {colorPallet.map((color) => (
                  <div
                    key={color}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleBackgroundColorChange(color)}
                  />
                ))}

                <ColorPicker onColorChange={handleBackgroundColorChange} />
              </div>
            </div>
          </div>
        )}

        <div className="sidebar-item" onClick={toggleBackgroundsPanel}>
          <FontAwesomeIcon icon={faImage} className="sidebar-icon" />
          <span>Backgrounds</span>
        </div>
        {activePanel === "backgrounds" && (
          <BackgroundsPanel
            backgrounds={backgrounds}
            onSelectBackground={handleSelectBackground}
          />
        )}
        <div className="sidebar-item" onClick={handleUploads}>
          <FontAwesomeIcon icon={faUpload} className="sidebar-icon" />
          <span>Images</span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            multiple // Allow multiple file selection
          />
        </div>
        <div className="sidebar-item" onClick={toggleTextSettings}>
          <FontAwesomeIcon icon={faTextWidth} className="sidebar-icon" />
          <span>Text</span>
        </div>
        {activePanel === "text" && (
          <div className="text-settings-window">
            <button className="icon-button add-text-button" onClick={addText}>
              Add text
            </button>
            <div className="form-group single-row">
              <div className="header">
                <button
                  className="icon-button"
                  onClick={() => applyStyle("H1")}
                >
                  <FontAwesomeIcon /> <span>H1</span>
                </button>
                <button
                  className="icon-button"
                  onClick={() => applyStyle("H2")}
                >
                  <FontAwesomeIcon /> <span>H2</span>
                </button>
                <button
                  className="icon-button"
                  onClick={() => applyStyle("H3")}
                >
                  <FontAwesomeIcon className="icon" />
                  <span>H3</span>
                </button>
              </div>
            </div>
            <label>
              Font:
              <select
                name="fontFamily"
                value={textProperties.fontFamily}
                onChange={handleChange}
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
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
            <div className="form-group single-row">
              <button
                className="icon-button"
                onClick={() => applyStyle("fontWeight")}
              >
                <FontAwesomeIcon icon={faBold} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => applyStyle("fontStyle")}
              >
                <FontAwesomeIcon icon={faItalic} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => applyStyle("textDecoration")}
              >
                <FontAwesomeIcon icon={faUnderline} className="icon" />
              </button>
            </div>
            <div className="form-group single-row">
              <button
                className="icon-button"
                onClick={() => handleAlignText("left", canvas)}
              >
                <FontAwesomeIcon icon={faAlignLeft} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => handleAlignText("center", canvas)}
              >
                <FontAwesomeIcon icon={faAlignCenter} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => handleAlignText("right", canvas)}
              >
                <FontAwesomeIcon icon={faAlignRight} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => handleAlignText("top", canvas)}
              >
                <FontAwesomeIcon icon={faAlignJustify} className="icon" />
              </button>
              <button
                className="icon-button"
                onClick={() => handleAlignText("bottom", canvas)}
              >
                <FontAwesomeIcon icon={faAlignJustify} className="icon" />
              </button>
            </div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleLogosPanel}>
          <FontAwesomeIcon icon={faImages} />
          <span>Logos</span>
        </div>
        {activePanel === "logos" && (
          <LogosPanel logos={logos} onSelectLogo={handleSelectLogo} />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
