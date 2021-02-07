import React from "react";
import { DefaultButton } from "../Buttons/Buttons";
import "./Summary.css";

const SummaryItem = ({ key_, value, greenValue }) => (
  <div className="SummaryItem">
    <div className="Key">{key_}</div>
    <div className="DottedDivider"></div>
    <div
      className="Value"
      style={{ color: greenValue ? "darkgreen" : "black" }}
    >
      {value}
    </div>
  </div>
);

const Summary = ({hideButton}) => (
  <div className="Summary">
    <SummaryItem key_="In the basket:" value={`2 items`} />
    <SummaryItem key_="Amount(2):" value={`$31.86`} />
    <SummaryItem key_="A discount:" greenValue value={`$2.86`} />
    <div className="DottedDividerFull"></div>
    <SummaryItem key_="Total amount:" value={`$29.00`} />
    {hideButton ? null : (
      <div className="SummaryCheckout">
        <DefaultButton background="black">CHECKOUT</DefaultButton>
      </div>
    )}
    <p class="SummaryNote">
      Available delivery methods can be seleсted at checkout
    </p>
  </div>
);

export default Summary;
