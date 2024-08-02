import React, { useRef, useEffect, useState } from "react";
import "./DragAndDrop.css";
import { fabric } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faRedoAlt, faMagic } from "@fortawesome/free-solid-svg-icons";

const DragAndDropWithText = ({ setCanvas, zoom }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [showAskAI, setShowAskAI] = useState(false);
  const [selectedText, setSelectedText] = useState(null);
  const [aiInputVisible, setAIInputVisible] = useState(false);
  const [aiInput, setAIInput] = useState("");
  const [aiOutput, setAIOutput] = useState(""); // State for AI output
  const [aiButtonPosition, setAIButtonPosition] = useState({ top: 0, left: 0 });
  const [showOptions, setShowOptions] = useState(false); // State for showing options
  const [showToneOptions, setShowToneOptions] = useState(false); // State for showing tone options
  const [toneMenuPosition, setToneMenuPosition] = useState({ top: 0, left: 0 });

  const predefinedOptions = [
    "Make shorter",
    "Make longer",
    "Change tone",
    "Improve language",
  ];

  const toneOptions = [
    { label: "Friendly", icon: faRedoAlt },
    { label: "Optimistic", icon: faRedoAlt },
    { label: "Respectful", icon: faRedoAlt },
    { label: "Assertive", icon: faRedoAlt },
    { label: "Surprise me", icon: faMagic },
  ];

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
        setShowOptions(false);
        setShowToneOptions(false);
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
    setShowOptions(true); // Show options when AI input is visible
  };

  const handleInputChange = (e) => {
    setAIInput(e.target.value);
  };

  const handleOptionClick = (option, index, element) => {
    if (option === "Change tone") {
      const elementRect = element.getBoundingClientRect();
      setToneMenuPosition({ top: elementRect.top - 60, left: elementRect.left + elementRect.width - 70 });
      setShowToneOptions(!showToneOptions);
    } else {
      setAIInput(option);
      handleSubmit(option);
    }
  };
  

  const handleToneOptionClick = (option) => {
    setAIInput(option.label);
    handleSubmit(option.label);
  };

  const handleSubmit = (input) => {
    // For now, just display the input as the output
    setAIOutput(input || aiInput);
    // Reset input
    setAIInput("");
    setAIInputVisible(false);
    setShowOptions(false);
    setShowToneOptions(false);
  };

  return (
    <div className="container">
      <canvas ref={canvasRef} />
      {aiOutput && (
        <div className="ai-output">
          {aiOutput}
        </div>
      )}
      {showAskAI && (
        <div className="ask-ai-button" style={{ top: aiButtonPosition.top, left: aiButtonPosition.left }} onClick={handleAskAIClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="16"
            height="16"
            style={{ marginRight: "5px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8l.867-1.825L14.828 8h2.014l-1.625 1.556L16.602 11.8l-1.735-.936L12 13.154 9.133 10.864 7.398 11.8l1.625-1.244L7.398 8h2.014L11.133 6.175 12 8z"
            />
          </svg>
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
          <button className="submit-button" onClick={() => handleSubmit(aiInput)}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      )}
      {showOptions && (
        <div className="ai-options" style={{ top: aiButtonPosition.top + 50, left: aiButtonPosition.left }}>
          {predefinedOptions.map((option, index) => (
            <div key={index} className="ai-option" onClick={(e) => handleOptionClick(option, index, e.target)}>
              <FontAwesomeIcon icon={faRedoAlt} />
              {option}
            </div>
          ))}
        </div>
      )}
      {showToneOptions && (
        <div className="tone-options" style={{ top: toneMenuPosition.top, left: toneMenuPosition.left }}>
          {toneOptions.map((tone, index) => (
            <div key={index} className="ai-option" onClick={() => handleToneOptionClick(tone)}>
              <FontAwesomeIcon icon={tone.icon} />
              {tone.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragAndDropWithText;
