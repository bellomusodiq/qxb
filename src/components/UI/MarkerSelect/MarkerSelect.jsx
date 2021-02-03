import React from "react";
import "./MarkerSelect.css";

const MarkerSelect = ({ selected, title, onSelect }) => (
  <div className="MarkerSelect">
    <div onClick={onSelect} className="CheckContainer">
      {selected ? <i className="fas fa-check"></i> : null}
    </div>
    <p>{title}</p>
  </div>
);

export default MarkerSelect;
