import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>📍 Toyfinity Store, #18, Ruby Layout, Bengaluru, India</p>
        <p>📞 Contact: +91-8867082099 | ✉️ Email: muthesh2004@gmail.com</p>
        <p>© {new Date().getFullYear()} Toyfinity. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
