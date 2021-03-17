import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "./Header.css";
import { CircleButton } from "../Buttons/Buttons";
import Cart from "../../../assets/images/cart.svg";
import LogoText from "../../../assets/images/logo-text.png";
import { useSelector } from "react-redux";
import Menu from "../../../assets/images/menu.svg";
import { useRef } from "react";

const Header = ({ openSideNav }) => {
  const [isActive, setIsActive] = useState("/");
  const location = useLocation();
  const cartCount = useSelector((state) => state.carts.count);
  const favouritesCount = useSelector((state) => state.favourites.count);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const inputRef = useRef();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    console.log(location.pathname);
    setIsActive(window.location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (openSearch) {
      inputRef.current?.focus();
    }
  }, [openSearch]);

  const submitSearch = (e) => {
    e.preventDefault();
    history.push(`/category/?q=${searchVal}`);
  };

  return (
    <>
      <header className="Header">
        <div className="HeaderTop">
          <div className="Location"></div>
        </div>
        <div className="HeaderBottom">
          <div className="HeaderMenu">
            <img
              src={Menu}
              onClick={openSideNav}
              alt="menu"
              className="MenuBtn"
            />
          </div>
          <Link to="/" className="HeaderText">
            <img height="100%" src={LogoText} alt="logo" />
          </Link>
          <div>
            <nav>
              {/* <NavLink activeClassName="Active" exact to="/">
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
          */}
              <CircleButton onClick={() => setOpenSearch(!openSearch)}>
                <i className="fas fa-search"></i>
              </CircleButton>
              <Link to="/accounts">
                <CircleButton>
                  <i className="far fa-user"></i>
                </CircleButton>
              </Link>
              {localStorage.getItem("userId") ? (
                <Link to="/accounts/favourites">
                  <CircleButton>
                    <div className="Badged">
                      <i className="far fa-heart"></i>
                      <div className="BadgedCounter BadgeCounterFav">
                        {favouritesCount}
                      </div>
                    </div>
                  </CircleButton>
                </Link>
              ) : null}
              <Link to="/cart">
                <CircleButton background="black">
                  <div className="Badged">
                    <img className="SvgIcon" src={Cart} alt="cart" />
                    <div className="BadgedCounter">{cartCount}</div>
                  </div>
                </CircleButton>
              </Link>
              {localStorage.getItem("token") ? (
                <CircleButton onClick={logout} background="white">
                  <i className="fas LogoutBtn fa-sign-out-alt"></i>
                </CircleButton>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
      <div
        style={{
          height: openSearch ? "fit-content" : 0,
          padding: openSearch ? 10 : "0 10px",
        }}
        className="HeaderSearch"
      >
        <form onSubmit={submitSearch}>
          <input
            ref={inputRef}
            type="text"
            placeholder="search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};

export default Header;
