import React, { useRef, useEffect } from "react";
import "./DragAndDrop.css";
import { fabric } from "fabric";

const DragAndDropWithText = ({ setCanvas }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: "white", // Set canvas background to white
      width: 700,
      height: 500,
    });
    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas); // Set the canvas reference

    // Event listener for keydown
    const handleKeyDown = (e) => {
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        (e.metaKey || e.ctrlKey)
      ) {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject) {
          fabricCanvas.remove(activeObject);
          fabricCanvas.renderAll();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      fabricCanvas.dispose();
      document.removeEventListener("keydown", handleKeyDown);
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
