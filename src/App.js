import React, { useState } from "react";
import "./App.css";
import DragAndDropWithText from "./DragAndDrop";
import PropertiesSidebar from "./Sidebar";

function App() {
  const [textProperties, setTextProperties] = useState({
    content: "Enter text...",
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Poppins",
  });

  return (
    <div className="App">
      <PropertiesSidebar textProperties={textProperties} setTextProperties={setTextProperties} />
      <DragAndDropWithText textProperties={textProperties} />
    </div>
  );
}

export default App;
