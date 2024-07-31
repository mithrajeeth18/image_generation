import React, { useRef, useEffect, useState } from "react";
import "./DragAndDrop.css";
import { fabric } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const DragAndDropWithText = ({ setCanvas, zoom }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [showAskAI, setShowAskAI] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [aiInputVisible, setAIInputVisible] = useState(false);
  const [aiInput, setAIInput] = useState("");
  const [aiButtonPosition, setAIButtonPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: "white",
      width: 700,
      height: 500,
    });
    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    fabricCanvas.on('mouse:up', (e) => {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        setShowAskAI(true);
        setSelectedText(activeObject);
        const boundingRect = activeObject.getBoundingRect();
        const canvasOffset = canvasElement.getBoundingClientRect();
        setAIButtonPosition({
          top: boundingRect.top + canvasOffset.top - 50,
          left: boundingRect.left + canvasOffset.left + boundingRect.width / 2 - 40,
        });
      } else {
        setShowAskAI(false);
        setSelectedText(null);
        setAIInputVisible(false);
      }
    });

    return () => {
      fabricCanvas.dispose();
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

  const handleAskAIClick = () => {
    setAIInputVisible(true);
    setShowAskAI(false);
  };

  const handleInputChange = (e) => {
    setAIInput(e.target.value);
  };

  const handleSubmit = () => {
    // Send aiInput and selectedText to backend for processing
    console.log("Send to backend:", aiInput, selectedText);
    // Reset input
    setAIInput("");
    setAIInputVisible(false);
    setShowAskAI(false);
  };

  return (
    <div className="container">
      <canvas ref={canvasRef} />
      {showAskAI && (
        <div className="ask-ai-button" style={{ top: aiButtonPosition.top, left: aiButtonPosition.left }} onClick={handleAskAIClick}>
          Ask AI
        </div>
      )}
      {aiInputVisible && (
        <div className="ai-input-container" style={{ top: aiButtonPosition.top, left: aiButtonPosition.left }}>
          <input 
            type="text" 
            value={aiInput} 
            onChange={handleInputChange} 
            placeholder="Ask AI to edit or generate" 
          />
          <button className="submit-button" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DragAndDropWithText;
