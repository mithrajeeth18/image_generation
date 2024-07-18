import React, { useState } from "react";
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import DragAndDropWithText from "./DragAndDrop";
import Footer from "./Footer";
import ZoomSlider from "./ZoomSlider"; // Import the ZoomSlider component

function App() {
  const [textProperties, setTextProperties] = useState({
    content: "Enter text...",
    color: "#000000",
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });

  const [canvas, setCanvas] = useState(null);
  const [zoom, setZoom] = useState(100); // Add zoom state

  return (
    <div className="App">
      <Header canvas={canvas} />
      <div className="main-content">
        <Sidebar 
          textProperties={textProperties} 
          setTextProperties={setTextProperties} 
          canvas={canvas} 
        />
        <div className="editor-container">
          <DragAndDropWithText 
            textProperties={textProperties} 
            setCanvas={setCanvas} 
            zoom={zoom} // Pass zoom to the canvas
          />
        </div>
      </div>
      <ZoomSlider zoom={zoom} setZoom={setZoom} /> {/* Add the ZoomSlider component */}
      <Footer />
    </div>
  );
}

export default App;
