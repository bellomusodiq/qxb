import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../assets/images/logo.png";
import { CircleButton } from "../Buttons/Buttons";
import Cart from "../../../assets/images/cart.svg";
import LogoText from "../../../assets/images/logo-text.png";

const Header = () => {
  return (
    <header className="Header">
      <div className="HeaderTop">
        <div className="Location">San Fransico</div>
        <div className="HeaderText">
          <img height="100%" src={LogoText} alt="logo" />
        </div>
      </div>
      <div className="HeaderBottom">
        <div className="Logo">
          <img src={Logo} alt="logo" />
        </div>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/">BACKPACKS</Link>
          <Link to="/">DUFFLES</Link>
          <Link to="/">HATS</Link>
          <Link to="/">ACCESSORIES</Link>
          <Link to="/">
            <CircleButton>
              <i className="fas fa-search"></i>
            </CircleButton>
          </Link>
          <Link to="/">
            <CircleButton>
              <i className="far fa-user"></i>
            </CircleButton>
          </Link>
          <Link to="/">
            <CircleButton>
              <i className="far fa-heart"></i>
            </CircleButton>
          </Link>
          <Link to="/">
            <CircleButton background="black">
              <div className="Badged">
                <img className="SvgIcon" src={Cart} alt="cart" />
                <div className="BadgedCounter">2</div>
              </div>
            </CircleButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
