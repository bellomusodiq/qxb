import React from "react";
import "./Buttons.css";
import { LoadingOutlined } from "@ant-design/icons";

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
  loading,
  type = "button",
}) => {
  const { bck, col } = getBackgroundColor(background);
  return (
    <button
      onClick={loading ? null : onClick}
      style={{
        background: bck,
        color: col,
        opacity: loading ? 0.4 : 1,
        cursor: loading ? "progress" : "pointer",
      }}
      className={`Button DefaultButton ${classNames}`}
      type={type}
    >
      {loading ? (
        <LoadingOutlined style={{ marginRight: 5 }} color={col} />
      ) : null}
      {children}
    </button>
  );
};
