import React from "react";
import { DefaultButton } from "../Buttons/Buttons";
import Card from "../Card/Card";
import "./ErrorComponent.css";

const ErrorComponent = ({ onReload }) => (
  <div className="ErrorComponent">
    <Card>
      <div className="ErrorContent">
          <p>Oops! Something went wrong!</p>
          <DefaultButton background="black" onClick={onReload}>TRY AGAIN</DefaultButton>
      </div>
    </Card>
  </div>
);

export default ErrorComponent;
