import React, { useState, useRef, useEffect } from "react";
import "./DragAndDropWithText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { fabric } from "fabric";
import Sidebar from "./Sidebar"; // Import Sidebar component

const DragAndDropWithText = () => {
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [selectedFontSize, setSelectedFontSize] = useState(20);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isEditingText, setIsEditingText] = useState(false);
  const dropAreaRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
          setActive(false);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        alert("This is not an Image File!");
        setActive(false);
      }
    }
  };

  useEffect(() => {
    if (file) {
      const canvasElement = canvasRef.current;
      const fabricCanvas = new fabric.Canvas(canvasElement);
      fabricCanvasRef.current = fabricCanvas;

      fabric.Image.fromURL(file, (img) => {
        img.set({
          left: 0,
          top: 0,
          scaleX: 700 / img.width,
          scaleY: 500 / img.height,
        });
        fabricCanvas.setWidth(700);
        fabricCanvas.setHeight(500);
        fabricCanvas.add(img);
        fabricCanvas.sendToBack(img);
      });

      // Event listeners for text editing state
      fabricCanvas.on("text:editing:entered", () => setIsEditingText(true));
      fabricCanvas.on("text:editing:exited", () => setIsEditingText(false));

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [file]);

  const addLabel = () => {
    if (fabricCanvasRef.current) {
      const text = new fabric.IText("Enter text...", {
        left: 100,
        top: 100,
        fill: selectedColor, // Set initial color
        fontSize: selectedFontSize,
        fontFamily: selectedFont,
        editable: true,
      });
      fabricCanvasRef.current.add(text);
      fabricCanvasRef.current.setActiveObject(text);
      text.enterEditing();
    }
  };

  const addShape = () => {
    if (fabricCanvasRef.current) {
      const rect = new fabric.Rect({
        left: 50,
        top: 50,
        fill: selectedColor, // Set initial color
        width: 100,
        height: 100,
      });
      fabricCanvasRef.current.add(rect);
    }
  };

  const addLine = () => {
    if (fabricCanvasRef.current) {
      const line = new fabric.Line([50, 100, 200, 200], {
        left: 50,
        top: 50,
        stroke: selectedColor, // Set initial color
      });
      fabricCanvasRef.current.add(line);
    }
  };

  const downloadImage = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas_image.png";
      link.click();
    }
  };

  const updateSelectedTextProperties = (property, value) => {
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set(property, value);
      fabricCanvasRef.current.renderAll();
    }
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
    updateSelectedTextProperties("fontFamily", e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setSelectedFontSize(e.target.value);
    updateSelectedTextProperties("fontSize", parseInt(e.target.value, 10));
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color);
      fabricCanvasRef.current.renderAll();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Delete" || e.key === "Backspace") && !isEditingText) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        fabricCanvasRef.current.remove(activeObject);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditingText]);

  return (
    <div className="main-container">
      <Sidebar
        onAddText={addLabel}
        onAddShape={addShape}
        onAddLine={addLine}
        onDownloadImage={downloadImage}
        onFontChange={handleFontChange}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
        selectedFont={selectedFont}
        selectedFontSize={selectedFontSize}
      />
      <div className="canvas-container">
        <div
          className={`drag-area ${active ? "active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setActive(true);
          }}
          onDragLeave={() => setActive(false)}
          onDrop={handleFileDrop}
          ref={dropAreaRef}
        >
          <canvas ref={canvasRef} />
          {!file && (
            <>
              <div className="icon">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              </div>
              <header>Drag & Drop to Upload File</header>
              <span>OR</span>
              <button
                onClick={() => document.getElementById("fileInput").click()}
              >
                Browse File
              </button>
              <input
                type="file"
                id="fileInput"
                hidden
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropWithText;
