import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faShapes, faTextWidth, faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faCog, faUpload } from '@fortawesome/free-solid-svg-icons';
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





const handleAlignText = (alignment, canvas) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'i-text') {
    switch (alignment) {
      case 'left':
        activeObject.set({ left: 0 });
        break;
      case 'center':
        activeObject.set({ left: canvas.width / 2 - activeObject.width / 2 });
        break;
      case 'right':
        activeObject.set({ left: canvas.width - activeObject.width });
        break;
      case 'top':
        activeObject.set({ top: 0 });
        break;
      case 'bottom':
        activeObject.set({ top: canvas.height - activeObject.height });
        break;
      default:
        break;
    }
    canvas.renderAll();
  }
};

function Sidebar({ textProperties, setTextProperties, canvas }) {
  const [isTextSettingsOpen, setIsTextSettingsOpen] = useState(false);
  const [isShapeSettingsOpen, setIsShapeSettingsOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(700);
  const [canvasHeight, setCanvasHeight] = useState(500);
  const fileInputRef = useRef(null);
  const [count, setcount] = useState(0);
  const [selectedShape, setSelectedShape] = useState(null);
  const[addTextDiv, setAddTextDiv] = useState(false);

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

  const fonts = [
    "Arial", "Verdana", "Poppins", "Times New Roman", "Courier New", 
    "Lucida Console", "Georgia", "Tahoma", "Impact", "Comic Sans MS",
    "CustomFont1", "CustomFont2" // Add your custom fonts here
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
    //console.log("Selected Text Properties:", selectedTextProperties);

    setSelectedText(activeObject);
    updateTextProperties(activeObject);
    setIsTextSettingsOpen(true);
    setAddTextDiv(false);// Open text settings panel
  } else {
    setSelectedText(null);
    setIsTextSettingsOpen(false); // Close text settings panel
  }

  if(activeObject && (activeObject.type === "rect" || activeObject.type === "circle" || activeObject.type === "triangle" || activeObject.type === "line" || activeObject.type === "diamond"))
  {
    setSelectedShape(activeObject);
    setIsShapeSettingsOpen(true);
  }
  else
  {
    setSelectedShape(null);
    setIsShapeSettingsOpen(false);
  }
  
};



  const handleDeselection = () => {
    setSelectedText(null);
    setIsTextSettingsOpen(false);
    setSelectedShape(null);
    setAddTextDiv(false);
    setIsShapeSettingsOpen(false);
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

  const addText = () =>
  {
    
    if (canvas)
    {
      setcount(count+1);
      let Textid = "TX";
      
      const text = new fabric.IText("Enter text...", {
        id: Textid + count,
        left: 100,
        top: 100,
        fill: textProperties.color, // Use textProperties.color
        fontSize: textProperties.fontSize,
        fontFamily: textProperties.fontFamily,
        fontWeight: textProperties.fontWeight,
        fontStyle: textProperties.fontStyle,
        textDecoration: textProperties.textDecoration,
        hasControls: false, // Disable resizing controls
        hasBorders: false,
      });
      
      //console.log(text);
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
      switch (style) {
        case 'fontWeight':
          newValue = selectedText.fontWeight === 'bold' ? 'normal' : 'bold';
          selectedText.set('fontWeight', newValue);
          break;
        case 'fontStyle':
          newValue = selectedText.fontStyle === 'italic' ? 'normal' : 'italic';
          selectedText.set('fontStyle', newValue);
          break;
        case 'textDecoration':
          newValue = selectedText.textDecoration.includes('underline') ? selectedText.textDecoration.replace('underline', '') : `${selectedText.textDecoration} underline`;
          selectedText.set('textDecoration', newValue.trim());
          break;
        default:
          break;
      }
      canvas.renderAll();
    }
  };
let clonedObject=null;
const handleCopy = () => {
  console.log("Copying object...");
  if (canvas) {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      // Extract properties from the active object
      const {
        text,
        left,
        top,
        fontSize,
        fill,
        fontFamily,
        fontWeight,
        fontStyle,
        textDecoration,
      } = activeObject;

      // Create a new fabric.js IText object with extracted properties
       clonedObject = new fabric.IText(text, {
         left: left + 20, // Example: add an offset to position it differently
         top: top + 20,
         fontSize,
         fill,
         fontFamily,
         fontWeight,
         fontStyle,
         textDecoration,
         hasControls: false, // Disable resizing controls
         hasBorders: false,
       });

      // Add the new object to the canvas
     
    } else {
      console.log("No active text object to copy.");
    }
  }
};



 const handlePaste = () => {
   console.log("Pasting object...");
   if (canvas && clonedObject) {
     const activeObject = canvas.getActiveObject();
     if (activeObject) {
       clonedObject.set({
         left: activeObject.left + 10,
         top: activeObject.top + 10,
       });
       canvas.add(clonedObject);
       canvas.setActiveObject(clonedObject);
       canvas.renderAll();
     }
   }
 };


 useEffect(() => {
   const handleKeyDown = (e) => {
     if (selectedText) {
       if (e.metaKey || e.ctrlKey) {
         switch (e.key.toLowerCase()) {
           case "c":
             e.preventDefault(); // Prevent default copy behavior
             handleCopy();
             break;
           case "v":
             e.preventDefault(); // Prevent default paste behavior
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
        // Clicked on free space in canvas
        setAddTextDiv(false);
        setIsCustomizeOpen(false);
        setIsShapeSettingsOpen(false);
        setIsTextSettingsOpen(false); // Close text settings panel
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


  const toggleTextSettings = () => {
    /*setIsTextSettingsOpen(!isTextSettingsOpen);
    if (!isTextSettingsOpen) {
      setIsShapeSettingsOpen(false); // Close shape settings if open
      //addText(); // Add text to the canvas when the button is clicked
    }*/
    setAddTextDiv(!addTextDiv);
    if (!addTextDiv) {
      setAddTextDiv(true); // Close shape settings if open
      //addText(); // Add text to the canvas when the button is clicked
    }

  };

  const toggleShapeSettings = () => {
    setIsShapeSettingsOpen(!isShapeSettingsOpen);
    if (!isShapeSettingsOpen) {
      setIsTextSettingsOpen(false); // Close text settings if open
    }
  };

  const handleCustomize = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
    if (!isCustomizeOpen) {
      setIsTextSettingsOpen(false); // Close other panels if open
      setIsShapeSettingsOpen(false);
    }
  };

  const handleUploads = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResizeCanvas = () => {
    if (canvas) {
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.renderAll();
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
      } else {
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fabric.Image.fromURL(e.target.result, (img) => {
            img.set({
              left: 0,
              top: 0,
              scaleX: canvas.width / img.width,
              scaleY: canvas.height / img.height,
            });
            canvas.clear();
            canvas.add(img);
            img.set({ selectable: false }); // Make image non-selectable
            canvas.sendToBack(img); // Send image to back
          });
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert("This is not an Image File!");
      }
    }
  };

  const gradients = [
    'linear-gradient(to right, #ff7e5f, #feb47b)',
    'linear-gradient(to right, #6a11cb, #2575fc)',
    'linear-gradient(to right, #ff6a00, #ee0979)',
    'linear-gradient(to right, #00c6ff, #0072ff)',
    'linear-gradient(to right, #f7971e, #ffd200)',
    'linear-gradient(to right, #7f00ff, #e100ff)',
    'linear-gradient(to right, #f953c6, #b91d73)',
    'linear-gradient(to right, #4e54c8, #8f94fb)',
    'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)'
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={toggleTextSettings}>
          <FontAwesomeIcon icon={faTextWidth} className="sidebar-icon" />
          <span>Text</span>
        </div>
      {addTextDiv && (<div className="text-settings-window">
             <button className="icon-button" onClick={addText}>
               Add text
             </button>
          </div>
        )}
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
              <button className="icon-button" onClick={() => applyStyle('fontWeight')}>
                <FontAwesomeIcon icon={faBold} className="icon" />
              </button>
              <button className="icon-button" onClick={() => applyStyle('fontStyle')}>
                <FontAwesomeIcon icon={faItalic} className="icon" />
              </button>
              <button className="icon-button" onClick={() => applyStyle('textDecoration')}>
                <FontAwesomeIcon icon={faUnderline} className="icon" />
              </button>
            </div>
            <div className="form-group">
              <button className="icon-button" onClick={() => handleAlignText('left', canvas)}>
                <FontAwesomeIcon icon={faAlignLeft} className="icon" />
              </button>
              <button className="icon-button" onClick={() => handleAlignText('center', canvas)}>
                <FontAwesomeIcon icon={faAlignCenter} className="icon" />
              </button>
              <button className="icon-button" onClick={() => handleAlignText('right', canvas)}>
                <FontAwesomeIcon icon={faAlignRight} className="icon" />
              </button>
              <button className="icon-button" onClick={() => handleAlignText('top', canvas)}>
                <FontAwesomeIcon icon={faAlignJustify} className="icon" />
              </button>
              <button className="icon-button" onClick={() => handleAlignText('bottom', canvas)}>
                <FontAwesomeIcon icon={faAlignJustify} className="icon" />
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
        <div className="sidebar-item" onClick={handleCustomize}>
          <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
          <span>Customize</span>
        </div>
        {isCustomizeOpen && (
          <div className="customize-settings-window">
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
            <button className="resize-button" onClick={handleResizeCanvas}>Resize Canvas</button>
            <div className="color-picker">
              <label>Background color:</label>
              <div className="color-options">
                {['#ffffff', '#f0f0f0', '#d3d3d3', '#c0c0c0', '#808080', '#000000', '#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff'].map(color => (
                  <div
                    key={color}
                    className="color-option"
                    style={{ backgroundColor: color }}
                    onClick={() => handleBackgroundColorChange(color)}
                  />
                ))}
                {gradients.map((gradient, index) => (
                  <div
                    key={index}
                    className="color-option"
                    style={{ background: gradient }}
                    onClick={() => handleBackgroundColorChange(gradient)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="sidebar-item" onClick={handleUploads}>
          <FontAwesomeIcon icon={faUpload} className="sidebar-icon" />
          <span>Uploads</span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
