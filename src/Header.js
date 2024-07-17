import React, { useState } from 'react';
import './Header.css';
import logo from './logos/logoJio.svg.png'; // Make sure you have a logo image in your src folder

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

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `canvas_image.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
