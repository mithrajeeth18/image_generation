import React, { useState, useRef, useEffect } from "react";
import "./DragAndDrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { fabric } from "fabric";

const DragAndDropWithText = ({ textProperties, setCanvas }) => {
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
      const fabricCanvas = new fabric.Canvas(canvasElement, {
        backgroundColor: 'white', // Set canvas background to white
      });
      fabricCanvasRef.current = fabricCanvas;
      setCanvas(fabricCanvas); // Set the canvas reference

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
        img.set({ selectable: false }); // Make image non-selectable
        fabricCanvas.sendToBack(img); // Send image to back
      });

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [file, setCanvas]);

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
          <div className="upload-message">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DragAndDropWithText;
