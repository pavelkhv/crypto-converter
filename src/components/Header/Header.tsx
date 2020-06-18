import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/img/logo.svg";
import sunDark from '../../assets/img/icons/sun-dark.svg';
import moonDark from '../../assets/img/icons/moon-dark.svg';

import "./header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__wrap">
        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" className="logo__icon"/>
          <span className="logo__text">R-Coins</span>
        </NavLink>

        <nav className="header__nav">
          <NavLink to="/" className="header__link" activeClassName="header__link_active" exact >Coins List</NavLink>
          <NavLink to="/conversion" className="header__link" activeClassName="header__link_active">Conversion</NavLink>
        </nav>

        <div className="toggle-theme">
          <img src={sunDark} className="toggle-theme__icon" alt="sun"/>
          <img src={moonDark} className="toggle-theme__icon" alt="moon"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
