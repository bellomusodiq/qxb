import React from "react";
import { Col, Row, Form } from "antd";
import { DataInput } from "../Accounts";
import { DefaultButton } from "../../UI/Buttons/Buttons";

const Contacts = () => (
  <Row justify="space-between">
    <Col xs={24} md={11}>
      <Form onSubmit={(e) => console.log(e)}>
        <DataInput label="Name" placeholder="name" required name="name" />
        <DataInput
          label="Surname"
          placeholder="surname"
          required
          name="surname"
        />
        <DataInput
          label="Phone number"
          placeholder="(212) 308-1220"
          required
          name="phone"
        />
        <DataInput
          label="E-mail"
          placeholder="john@mail.com"
          required
          name="email"
        />
        <h3 style={{ fontWeight: "bold", margin: "30px 0" }}>
          Change Password
        </h3>
        <DataInput
          label="Password"
          placeholder="password"
          required
          name="password"
        />
        <DataInput
          label="New Password"
          placeholder="confirm password"
          required
          name="new_password"
        />
        <div className="SaveChanges">
          <DefaultButton background="black">SAVE CHANGES</DefaultButton>
        </div>
      </Form>
    </Col>
    <Col className="DeliveryAddress" xs={24} md={11}>
      <div>
        <div>
          <h3 style={{ fontWeight: "bold" }}>Delivery addresses</h3>
          <div className="AddAddress">
            <i className="fas fa-plus"></i>
            <p>Add Shipping Address</p>
          </div>
          <h3 style={{ fontWeight: "bold", marginTop: 50 }}>
            Link social networks
          </h3>
          <div className="LinkAccount">
            <p>Link your social network account</p>
            <p>and use it for authorization</p>
          </div>
          <div className="Oauths">
            <i className="fab fa-google-plus-g fa-3x"></i>
            <i className="fab fa-facebook fa-3x"></i>
          </div>
        </div>
        <div className="DeleteAccount">
          <i className="fas fa-times"></i>
          <p>Delete Account</p>
        </div>
      </div>
    </Col>
  </Row>
);

export default Contacts;
