import React from "react";
import "./Alert.css";

const Alert = ({ show, error, message }) => (
  <div
    style={{ transform: show ? "translateX(0)" : "translateX(100vw)" }}
    className="Alert"
  >
    <p style={{ color: error ? "tomato" : "green" }}>
      {message}
    </p>
  </div>
);

export default Alert;
