import React from "react";
import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg";

import { ThemeType } from "../../types/types";
import { ChangeThemeType } from "../../redux/actions/themeAction";

import "./header.scss";

type PropsType = {
  theme: ThemeType;
  changeTheme: () => ChangeThemeType
};

const Header: React.FC<PropsType> = ({ theme, changeTheme}) => {
  return (
    <header className={`header header_${theme}`}>
      <div className="header__wrap">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo__icon"/>
          <span className={`logo__text logo__text_${theme}`}>R-Coins</span>
        </Link>

        <nav className="header__nav">
          <NavLink to="/" className="header__link" activeClassName="header__link_active" exact >Coins List</NavLink>
          <NavLink to="/conversion" className="header__link" activeClassName="header__link_active">Conversion</NavLink>
          <NavLink to="/feeds" className="header__link" activeClassName="header__link_active">Feeds</NavLink>
        </nav>

        <div className={`toggle-theme toggle-theme_${theme}`} onClick={changeTheme}>
          <img 
            src={require(`../../assets/img/icons/sun-${theme}.svg`)} 
            className="toggle-theme__icon" 
            alt="sun"
          />
          <img 
            src={require(`../../assets/img/icons/moon-${theme}.svg`)} 
            className="toggle-theme__icon" 
            alt="moon"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
