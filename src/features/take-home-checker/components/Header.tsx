import React from 'react';
import './Header.css'; // Importa el archivo CSS

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">Take Home Checker</div>
      <nav className="nav">
        <ul>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Interview Ready</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Template</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;