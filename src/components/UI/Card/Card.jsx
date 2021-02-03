import React from "react";
import "./Card.css";

const Card = ({ children }) => (
  <div style={{ borderRadius: "5px" }} className="Card">
    {children}
  </div>
);

export default Card;
