import React, { useState } from "react";
import { Col, Row } from "antd";
import Summary from "../../UI/Summary/Summary";
import "./Payment.css";

const PaymentItem = ({ title, description, selected, onClick }) => (
  <div onClick={onClick} class="PaymentItem">
    <div class="PaymentItemText">
      <p class="PaymentItemHeader">{title}</p>
      <p class="PaymentItemText">{description}</p>
    </div>
    <div class="PaymentItemIcon">
      <div
        class={selected ? "outer-circle outer-circle-active" : "outer-circle"}
      >
        <div
          class={selected ? "inner-circle inner-circle-active" : "inner-circle"}
        ></div>
      </div>
    </div>
  </div>
);

const Payment = () => {
  const [current, setCurrent] = useState("cashless");
  return (
    <Row
      gutter={50}
      align="top"
      style={{ marginBottom: 30 }}
      justify="space-between"
    >
      <Col xs={24} md={17}>
        <div class="PaymentItems">
          <PaymentItem
            title="Cashless Payment"
            description="payment by card online"
            selected={current === "cashless"}
            onClick={() => setCurrent("cashless")}
          />
          <PaymentItem
            title="PayPal"
            description="PayPal Service"
            selected={current === "paypal"}
            onClick={() => setCurrent("paypal")}
          />
          <PaymentItem
            title="Google Pay"
            description="Payment with google wallet"
            selected={current === "googlepay"}
            onClick={() => setCurrent("googlepay")}
          />
        </div>
          <PaymentItem
            title="Apple Pay"
            description="Payment with apple wallet"
            selected={current === "applepay"}
            onClick={() => setCurrent("applepay")}
          />
          <PaymentItem
            title="Cash Payment"
            description="Uppon receipt of the goods"
            selected={current === "cash"}
            onClick={() => setCurrent("cash")}
          />
      </Col>
      <Col className="" xs={24} md={7}>
        <Summary hideButton />
      </Col>
    </Row>
  );
};

export default Payment;
