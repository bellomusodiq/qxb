import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../../assets/images/logo.png";
import { CircleButton } from "../Buttons/Buttons";
import Cart from "../../../assets/images/cart.svg";
import LogoText from "../../../assets/images/logo-text.png";
import HeaderDropdown from "../HeaderDropdown";
import { useSelector } from "react-redux";

const Header = () => {
  const [isActive, setIsActive] = useState("/");
  const location = useLocation();
  const cartCount = useSelector(state => state.carts.count);
  const favouritesCount = useSelector(state => state.favourites.count);

  useEffect(() => {
    console.log(location.pathname);
    setIsActive(window.location.pathname);
  }, [location.pathname]);
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
          <NavLink activeClassName="Active" exact to="/">
            HOME
          </NavLink>
          <NavLink activeClassName="Active" exact to="/catalogue/backpacks">
            BACKPACKS
          </NavLink>
          <NavLink activeClassName="Active" exact to="/catalogue/duffles">
            DUFFLES
          </NavLink>
          <NavLink activeClassName="Active" exact to="/catalogue/hats">
            HATS
          </NavLink>
          <HeaderDropdown>
            <div>ACCESSORIES</div>
          </HeaderDropdown>
          <Link to="/category">
            <CircleButton>
              <i className="fas fa-search"></i>
            </CircleButton>
          </Link>
          <Link to="/accounts">
            <CircleButton>
              <i className="far fa-user"></i>
            </CircleButton>
          </Link>
          <Link to="/accounts/favourites">
            <CircleButton>
              <div className="Badged">
                <i className="far fa-heart"></i>
                <div className="BadgedCounter BadgeCounterFav">{favouritesCount}</div>
              </div>
            </CircleButton>
          </Link>
          <Link to="/cart">
            <CircleButton background="black">
              <div className="Badged">
                <img className="SvgIcon" src={Cart} alt="cart" />
                <div className="BadgedCounter">{cartCount}</div>
              </div>
            </CircleButton>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
