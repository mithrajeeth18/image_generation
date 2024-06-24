import React from 'react';
import './Header.css';
import logo from './logoJio.svg.png'; // Make sure you have a logo image in your src folder

function Header({ canvas }) {
  const downloadImage = async () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const blob = await (await fetch(dataURL)).blob();

      const opts = {
        types: [{
          description: 'PNG Image',
          accept: {'image/png': ['.png']},
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
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={downloadImage}>Download</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">Preview</a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
