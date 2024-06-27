import React, { useState, useRef, useEffect } from "react";
import "./DragAndDrop.css";
import { fabric } from "fabric";

const DragAndDropWithText = ({ textProperties, setCanvas }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: 'white', // Set canvas background to white
      width: 700,
      height: 500
    });
    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas); // Set the canvas reference

    return () => {
      fabricCanvas.dispose();
    };
  }, [setCanvas]);

  return (
    <div className="container">
      <div className="drag-area">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default DragAndDropWithText;
