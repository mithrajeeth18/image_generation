import React, { useRef, useEffect } from "react";
import "./DragAndDrop.css";
import { fabric } from "fabric";

const DragAndDropWithText = ({ setCanvas, zoom }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: "white",
      width: 700,
      height: 500,
    });
    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    const handleKeyDown = (e) => {
      if ((e.key === "Delete" || e.key === "Backspace") && (e.metaKey || e.ctrlKey)) {
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

  useEffect(() => {
    if (fabricCanvasRef.current) {
      const canvas = fabricCanvasRef.current;
      const zoomFactor = zoom / 100;

      canvas.setZoom(zoomFactor);
      canvas.setWidth(700 * zoomFactor);
      canvas.setHeight(500 * zoomFactor);

      // Adjust all objects on the canvas
      canvas.getObjects().forEach((obj) => {
        obj.scaleX *= zoomFactor;
        obj.scaleY *= zoomFactor;
        obj.left *= zoomFactor;
        obj.top *= zoomFactor;
        obj.setCoords();
      });

      const backgroundImage = canvas.backgroundImage;
      if (backgroundImage) {
        const scaleX = (canvas.width / canvas.originalBackgroundImageWidth) * zoomFactor;
        const scaleY = (canvas.height / canvas.originalBackgroundImageHeight) * zoomFactor;

        backgroundImage.set({
          scaleX: scaleX,
          scaleY: scaleY,
        });

        canvas.renderAll();
      }
    }
  }, [zoom]);

  return (
    <div className="container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DragAndDropWithText;
