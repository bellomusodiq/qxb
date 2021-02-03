import React from "react";
import { Col, Form, Row, Input } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import "./Accounts.css";
import { NavLink, Route, Switch } from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import Orders from "./Orders/Orders";
import Reviews from "./Reviews/Reviews";
import Favourites from "./Favourites/Favourites";

export const DataInput = ({ placeholder, label, required, name }) => (
  <Row align="middle" gutter={30}>
    <Col xs={24} md={6}>
      {label}
    </Col>
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

const Accounts = () => {
  return (
    <div className="Accounts">
      <div className="AccountsHeader">
        <h2>Your Account</h2>
        <p>Mayowa Gordon</p>
      </div>
      <div className="AccountsNav">
        <NavLink exact activeClassName="AccountsNavActive" to="/accounts">
          <DefaultButton>Contact</DefaultButton>
        </NavLink>
        <NavLink exact activeClassName="AccountsNavActive" to="/accounts/my-orders">
          <DefaultButton>My orders</DefaultButton>
        </NavLink>
        <NavLink exact activeClassName="AccountsNavActive" to="/accounts/my-reviews">
          <DefaultButton>My reviews</DefaultButton>
        </NavLink>
        <NavLink exact activeClassName="AccountsNavActive" to="/accounts/favourites">
          <DefaultButton>Favorites</DefaultButton>
        </NavLink>
      </div>
      <Route path="/accounts/my-orders" exact component={Orders} />
      <Route path="/accounts/my-reviews" exact component={Reviews} />
      <Route path="/accounts/favourites" exact component={Favourites} />
      <Route path="/accounts" exact component={Contacts} />
    </div>
  );
};

export default Accounts;
