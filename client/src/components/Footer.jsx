import React from 'react';
import './Footer.css';

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">
             Sudip Dhungana
            </span>
            <p className="footer-tagline">Building the web, one line at a time.</p>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} {profile?.name || 'Developer'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
