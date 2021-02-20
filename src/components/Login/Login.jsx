import React, { useState } from "react";
import { Col, Form, Input, Row } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import { Link, useHistory, useLocation } from "react-router-dom";
import Alert from "../UI/Alert/Alert";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const login = (data) => {
    const url = `${BASE_URL}/api/login/`;
    setLoading(true);
    setSuccess(false);
    setError(false);
    axios
      .post(url, data)
      .then((result) => {
        setLoading(false);
        setSuccess(true);
        setShowAlert(true);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.user_id);
        localStorage.setItem("cartId", result.data.cart_id);
        setTimeout(() => {
          setShowAlert(false);
          const params = new URLSearchParams(location.search);
          if (params.has("next")) {
            history.push(params.get("next"));
          } else {
            history.push("/");
          }
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        setSuccess(false);
        setShowAlert(true);
        setError(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };
  return (
    <div className="Signup">
      <Alert
        message={
          success
            ? "login was successful, redirecting"
            : "something went wrong, try again"
        }
        show={showAlert}
        error={error}
      />
      <Row justify="space-between">
        <Col md={11}>
          <Form onFinish={login}>
            {error ? (
              <p className="PasswordMatch">
                email and/or password is incorrect
              </p>
            ) : null}
            <Form.Item
              rules={[{ required: true }]}
              name="username"
              placeholder="email"
            >
              <Input
                name="username"
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
              <DefaultButton loading={loading} type="submit" background="white">
                LOGIN
              </DefaultButton>
            </div>
          </Form>
        </Col>
        <Col className="AlternateSignin" md={12}>
          <p>Do you already have a personal account?</p>
          <p style={{ margin: "50px 0" }}>
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>{" "}
            to your account to track your account status and automatically
            complete forms
          </p>
          {/* <p>Alternate SignUp:</p>
          <div className="Oauths">
            <i className="fab fa-google-plus-g fa-3x"></i>
            <i className="fab fa-facebook fa-3x"></i>
          </div> */}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
