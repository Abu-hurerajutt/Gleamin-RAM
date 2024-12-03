import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to our store! We provide the best quality products for your
            needs. Shop with us and experience excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 E-commerce St, Online City</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            {/* External links remain as <a> */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaSquareInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GleaminRAM. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
