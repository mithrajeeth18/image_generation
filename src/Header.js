import React, { useState } from 'react';
import './Header.css';
import logo from './logoJio.svg.png'; // Make sure you have a logo image in your src folder

function Header({ canvas }) {
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  const handleFormatChange = (selectedFormat) => {
    setDropdownVisible(false); // Close the dropdown after selection
    downloadImage(selectedFormat);
  };

  const downloadImage = async (selectedFormat) => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: selectedFormat,
        quality: 1,
      });

      const blob = await (await fetch(dataURL)).blob();

      const opts = {
        types: [{
          description: `${selectedFormat.toUpperCase()} Image`,
          accept: { [`image/${selectedFormat}`]: [`.${selectedFormat}`] },
        }],
      };

      try {
        const handle = await window.showSaveFilePicker(opts);
        const writableStream = await handle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
      } catch (err) {
        console.error('Error saving file:', err);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="Jio Logo" className="navbar-logo" /> JioBanners
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Generate</a>
          </li>
          <li className="nav-item download-container">
            <a className="nav-link" href="#" onClick={() => setDropdownVisible(!dropdownVisible)}>Download</a>
            {dropdownVisible && (
              <div className="dropdown-content">
                <a href="#" onClick={() => handleFormatChange('jpeg')}>JPEG</a>
                <a href="#" onClick={() => handleFormatChange('png')}>PNG</a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
