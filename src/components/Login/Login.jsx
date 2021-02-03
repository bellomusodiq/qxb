import React from "react";
import { Col, Form, Input, Row } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import Checkbox from "antd/lib/checkbox/Checkbox";

const Login = () => {
  return (
    <div className="Signup">
      <Row justify="space-between">
        <Col md={11}>
          <Form onSubmit={(e) => console.log(e)}>
            <Form.Item
              rules={[{ required: true }]}
              name="email"
              placeholder="email"
            >
              <Input
                name="email"
                type="email"
                className="custom-form"
                placeholder="Email *"
                required
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              name="password"
              placeholder="password"
            >
              <Input
                name="password"
                type="password"
                className="custom-form"
                placeholder="Password *"
                required
              />
            </Form.Item>
            <Form.Item name="is_notify">
              <Checkbox>
                Let me know about discounts, sales and new promotions
              </Checkbox>
            </Form.Item>
            <div className="SignupButton">
              <DefaultButton background="white">LOGIN</DefaultButton>
            </div>
          </Form>
        </Col>
        <Col className="AlternateSignin" md={12}>
          <p>Do you already have a personal account?</p>
          <p style={{ margin: "50px 0" }}>
            <span>Sign Up</span> to your account to track your account status
            and automatically complete forms
          </p>
          <p>Alternate SignUp:</p>
          <div className="Oauths">
            <i className="fab fa-google-plus-g fa-3x"></i>
            <i className="fab fa-facebook fa-3x"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
