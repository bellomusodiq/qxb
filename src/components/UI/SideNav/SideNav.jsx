import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import "./SideNav.css";

const SideNav = ({ show, close }) => {
  const location = useLocation();
  return (
    <>
      {show ? <div onClick={close} className="Backdrop"></div> : null}
      <div
        style={{ transform: show ? "translateX(0)" : "translateX(-100vw)" }}
        className="SideNav"
      >
        <div className="CancelButton">
          <i onClick={close} className="fas fa-times fa-2x"></i>
        </div>
        <div className="SideNav-Nav">
          <Link
            onClick={close}
            className={location.pathname === "/" ? "Active" : ""}
            to="/"
          >
            HOME
          </Link>
          <Link
            onClick={close}
            className={location.pathname === "/catalogue/men" ? "Active" : ""}
            to="/catalogue/men"
          >
            MENS
          </Link>
          <Link
            onClick={close}
            className={
              location.pathname === "/catalogue/duffles" ? "Active" : ""
            }
            to="/catalogue/duffles"
          >
            DUFFLES
          </Link>
          <Link
            onClick={close}
            className={location.pathname === "/catalogue/hats" ? "Active" : ""}
            to="/catalogue/hats"
          >
            HATS
          </Link>
          <HeaderDropdown>
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
              to=""
            >
              ACCESSORIES
            </a>
          </HeaderDropdown>
        </div>
      </div>
    </>
  );
};

export default SideNav;
