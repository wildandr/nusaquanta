// components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <div>
      <header className="header">
        <nav className="navbar container">
          <ul>
            <li>
              <a href="/" className=" text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className=" text-white">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className=" text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
