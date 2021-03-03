import React from "react";
import "./HeaderMobile.css";
import Logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Cart from "../../../assets/images/cart.svg";
import { CircleButton } from "../Buttons/Buttons";
import Menu from "../../../assets/images/menu.svg";
import { useSelector } from "react-redux";

const HeaderMobile = ({ openSideNav }) => {
  const cartCount = useSelector(state => state.carts.count);

  return (
    <div className="HeaderMobile">
      <div className="HeaderMobileTop">San Fransisco</div>
      <div className="HeaderMobileBottom">
        <div className="HeaderMobileLogo">
          <div className="Logo">
            <img src={Logo} alt="logo" />
          </div>
          <h1>QxB</h1>
        </div>
        <div className="HeaderMobileNav">
          <img
            src={Menu}
            onClick={openSideNav}
            alt="menu"
            className="MenuBtn"
          />
          <nav>
            <Link to="/category">
              <CircleButton>
                <i className="fas fa-search fa-1x"></i>
              </CircleButton>
            </Link>
            <Link to="/accounts">
              <CircleButton>
                <i className="far fa-user fa-1x"></i>
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
      </div>
    </div>
  );
};

export default HeaderMobile;
