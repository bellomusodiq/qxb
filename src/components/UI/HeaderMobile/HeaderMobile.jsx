import React, { useState, useEffect, useRef } from "react";
import "./HeaderMobile.css";
import Logo from "../../../assets/images/logo-text.png";
import { Link, useHistory } from "react-router-dom";
import Cart from "../../../assets/images/cart.svg";
import { CircleButton } from "../Buttons/Buttons";
import Menu from "../../../assets/images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../../App";

const HeaderMobile = ({ openSideNav }) => {
  const cartCount = useSelector((state) => state.carts.count);
  const favouritesCount = useSelector((state) => state.favourites.count);
  const [searchVal, setSearchVal] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const inputRef = useRef();

  const logout = () => {
    localStorage.clear();
    fetchCart(dispatch);
    history.push("/");
  };

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
    <div className="HeaderMobile">
      <div className="HeaderMobileTop"></div>
      <div className="HeaderMobileBottom">
        <div className="HeaderMobileLogo">
          <Link to="/" className="">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="HeaderMobileNav">
          <img
            src={Menu}
            onClick={openSideNav}
            alt="menu"
            className="MenuBtn"
          />
          <nav>
            <CircleButton onClick={() => setOpenSearch(!openSearch)}>
              <i className="fas fa-search fa-1x"></i>
            </CircleButton>
            <Link to="/accounts">
              <CircleButton>
                <i className="far fa-user fa-1x"></i>
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
              <CircleButton
                onClick={logout}
                classNames="MobileLogout"
                background="white"
              >
                <i className="fas LogoutBtn fa-sign-out-alt"></i>
              </CircleButton>
            ) : null}
          </nav>
        </div>
      </div>
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
    </div>
  );
};

export default HeaderMobile;
