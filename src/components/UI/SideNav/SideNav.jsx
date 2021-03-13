import React, { useEffect, useState, usstate } from "react";
import { Link, useLocation } from "react-router-dom";
import HeaderDropdown from "../HeaderDropdown";
import "./SideNav.css";
import axios from "axios";
import { BASE_URL } from "../../../CONFIG";

const SideNav = ({ show, close }) => {
  const location = useLocation();

  const [Categories, setCategories] = useState([]);

  const fetchCategories = () => {
    const url = `${BASE_URL}/api/categories/`;
    axios.get(url).then((result) => {
      setCategories(result.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
          {Categories.map((category) => (
            <Link
              key={category.id}
              onClick={close}
              className={
                location.pathname === "/catalogue/backpacks" ? "Active" : ""
              }
              to={`/catalogue/${category.title}`}
            >
              {category.title}
            </Link>
          ))}
          {/* <HeaderDropdown>
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
              to=""
            >
              ACCESSORIES
            </a>
          </HeaderDropdown> */}
        </div>
      </div>
    </>
  );
};

export default SideNav;
