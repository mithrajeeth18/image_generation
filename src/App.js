import React, { useState } from "react";
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import DragAndDropWithText from "./DragAndDrop";
import Footer from "./Footer"; // Import the Footer component

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
          />
        </div>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
}

export default App;

