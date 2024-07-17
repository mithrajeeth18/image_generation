import React from 'react';
import './Footer.css';
import logo from './logos/logoJio.svg.png'; // Update the path as per your structure

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Jio Logo" className="footer-logo" />
          <span className="footer-text">
            Copyright © 2024 Reliance Jio Infocomm Ltd. All rights reserved.
          </span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Press release</a>
          <a href="#" className="footer-link">Regulatory</a>
          <a href="#" className="footer-link">Policies</a>
          <a href="#" className="footer-link">Terms & conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
