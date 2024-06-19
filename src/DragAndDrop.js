import React, { useState, useRef, useEffect } from "react";
import "./DragAndDrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { fabric } from "fabric";

const DragAndDropWithText = ({ textProperties }) => {
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(false);
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

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [file]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const { type, content, color, fontSize, fontFamily, fontWeight, fontStyle, textDecoration, backgroundColor, action } = textProperties;

      if (type === 'text') {
        addText(content, color, fontSize, fontFamily, fontWeight, fontStyle, textDecoration, backgroundColor);
      }

      if (action === 'download') {
        downloadImage();
      }
    }
  }, [textProperties]);

  const addText = (content, color, fontSize, fontFamily, fontWeight, fontStyle, textDecoration, backgroundColor) => {
    const text = new fabric.IText(content, {
      left: 100,
      top: 100,
      fill: color,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      textDecoration,
      backgroundColor,
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    text.enterEditing();
  };

  const addShape = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 60,
      height: 70
    });
    fabricCanvasRef.current.add(rect);
  };

  const addLine = () => {
    const line = new fabric.Line([50, 100, 200, 200], {
      left: 100,
      top: 100,
      stroke: 'blue'
    });
    fabricCanvasRef.current.add(line);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();
  };

  return (
    <div className="container">
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
      {file && (
        <div className="controls">
          <button className="control-button" onClick={() => addText(textProperties.content, textProperties.color, textProperties.fontSize, textProperties.fontFamily, textProperties.fontWeight, textProperties.fontStyle, textProperties.textDecoration, textProperties.backgroundColor)}>
            Add Text
          </button>
          <button className="control-button" onClick={addShape}>
            Add Shape
          </button>
          <button className="control-button" onClick={addLine}>
            Add Line
          </button>
          <button className="control-button" onClick={downloadImage}>
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDropWithText;
