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
  disabled = false,
  style = {}
}) => {
  const { bck, col } = getBackgroundColor(background);
  let cursor = "pointer";
  if (loading) {
    cursor = "progress";
  }
  if (disabled) {
    cursor = "not-allowed"
  }
  return (
    <button
      onClick={loading || disabled ? null : onClick}
      style={{
        ...style,
        background: bck,
        color: col,
        opacity: loading || disabled ? 0.4 : 1,
        cursor: cursor,
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
