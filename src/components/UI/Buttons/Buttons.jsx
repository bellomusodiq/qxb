import React from "react";
import "./Buttons.css";

const getBackgroundColor = (background) => {
  let bck = "white";
  let col = "black";
  if (background === "black") {
    bck = "rgba(23,23,23,1)";
    col = "white";
  }
  return { bck, col };
};

export const CircleButton = ({
  onClick = () => {},
  children,
  background,
  classNames,
}) => {
  const { bck, col } = getBackgroundColor(background);
  return (
    <button
      onClick={onClick}
      style={{ background: bck, color: col }}
      className={`Button CircleButton ${classNames}`}
    >
      {children}
    </button>
  );
};

export const DefaultButton = ({
  onClick = () => {},
  children,
  background,
  classNames,
}) => {
  const { bck, col } = getBackgroundColor(background);
  return (
    <button
      onClick={onClick}
      style={{ background: bck, color: col }}
      className={`Button DefaultButton ${classNames}`}
    >
      {children}
    </button>
  );
};
