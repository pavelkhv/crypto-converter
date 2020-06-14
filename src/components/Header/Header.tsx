import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="./" className="header__link">Coins List</Link>
      <Link to="./conversion" className="header__link">Conversion</Link>
    </header>
  );
};

export default Header;
