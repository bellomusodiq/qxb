import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ show, close }) => (
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
        <Link onClick={close} to="#home">HOME</Link>
        <Link onClick={close} className="Active" to="#home">MENS</Link>
        <Link onClick={close} to="#home">DUFFLES</Link>
        <Link onClick={close} to="#home">HATS</Link>
        <Link onClick={close} to="#home">ACCESSORIES</Link>
      </div>
    </div>
  </>
);

export default SideNav;
