import React from "react";
import { Col, Form, Row, Input } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import { NavLink, Route } from "react-router-dom";
import Contact from "./Contact/Contact";
import "./Checkout.css";
import Shipping from "./Shipping/Shipping";
import Payment from "./Payment/Payment";

export const DataInput = ({ placeholder, label, required, name }) => (
  <Row align="start" gutter={30}>
    <Col xs={24} md={18}>
      <Form.Item
        rules={[{ required: required }]}
        name={name}
        placeholder={placeholder}
      >
        <Input
          name={name}
          className="custom-form"
          placeholder={`${placeholder} *`}
          required={required}
        />
      </Form.Item>
    </Col>
  </Row>
);

const Checkout = () => {
  return (
    <div className="Accounts">
      <div className="AccountsHeader">
        <h2>Checkout</h2>
        <p>Mayowa Gordon</p>
      </div>
      <div className="AccountsNav CheckoutNav">
        <NavLink exact activeClassName="AccountsNavActive" to="/checkout">
          <DefaultButton>Contact</DefaultButton>
        </NavLink>
        <NavLink exact activeClassName="AccountsNavActive" to="/checkout/shipping">
          <DefaultButton>Shipping</DefaultButton>
        </NavLink>
        <NavLink exact activeClassName="AccountsNavActive" to="/checkout/payment">
          <DefaultButton>Payment</DefaultButton>
        </NavLink>
      </div>
      <Route path="/checkout/shipping" exact component={Shipping} />
      <Route path="/checkout/payment" exact component={Payment} />
      <Route path="/checkout" exact component={Contact} />
    </div>
  );
};

export default Checkout;
