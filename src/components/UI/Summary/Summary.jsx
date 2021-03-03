import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

const Summary = ({ hideButton }) => {
  const history = useHistory();
  const cartCount = useSelector((state) => state.carts.count) || 0;
  const totalAmount = useSelector((state) => state.carts.totalAmount) || 0;

  return (
    <div className="Summary">
      <SummaryItem key_="In the basket:" value={`${cartCount} items`} />
      <SummaryItem key_={`Amount(${cartCount}):`} value={`$${totalAmount}`} />
      {/* <SummaryItem key_="A discount:" greenValue value={`$2.86`} /> */}
      <div className="DottedDividerFull"></div>
      <SummaryItem key_="Total amount:" value={`$${totalAmount}`} />
      {hideButton ? null : (
        <div className="SummaryCheckout">
          <DefaultButton
            onClick={() => history.push("/checkout")}
            background="black"
          >
            CHECKOUT
          </DefaultButton>
        </div>
      )}
      <p className="SummaryNote">
        Available delivery methods can be seleсted at checkout
      </p>
    </div>
  );
};

export default Summary;
