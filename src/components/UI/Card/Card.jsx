import React from "react";
import "./Card.css";

const Card = ({ children, onClick = null }) => (
  <div
    onClick={onClick}
    style={{ borderRadius: "5px", cursor: onClick ? "pointer" : "default" }}
    className="Card"
  >
    {children}
  </div>
);

export default Card;
