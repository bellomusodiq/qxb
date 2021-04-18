import React, { useState } from "react";
import { Col, Form, Input, Row } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import { Link, useHistory, useLocation } from "react-router-dom";
import Alert from "../UI/Alert/Alert";
import { fetchCartItems } from "../../App";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const forgotPassword = (data) => {
    const url = `${BASE_URL}/api/send-reset-token/`;
    setLoading(true);
    setSuccess(false);
    setError(false);
    axios
      .post(url, data)
      .then((result) => {
        history.push('/verify-reset-token')
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
            ? ""
            : "something went wrong, try again"
        }
        show={showAlert}
        error={error}
      />
      <Row justify="space-between">
        <Col md={11}>
          <h3 style={{ margin: "50px 0" }}>
            Enter you email to reset your password
          </h3>
          <Form onFinish={forgotPassword}>
            {error ? (
              <p className="PasswordMatch">
                account with this email does not exist
              </p>
            ) : null}
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
            <div className="SignupButton">
              <DefaultButton loading={loading} type="submit" background="white">
                RESET PASSWORD
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

export default ForgotPassword;
