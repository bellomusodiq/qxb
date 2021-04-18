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

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const resetPassword = (data) => {
    if (data.password.trim() !== data.confirmPassword.trim()) {
      setConfirmPasswordError(true);
      return;
    }
    const token = new URLSearchParams(location.search).get("token");
    const url = `${BASE_URL}/api/reset-password/`;
    setLoading(true);
    setSuccess(false);
    setError(false);
    setConfirmPasswordError(false);
    axios
      .post(url, {...data, token })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          history.push("/login");
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
            ? "password changed succesfully, redirecting"
            : "something went wrong, try again"
        }
        show={showAlert}
        error={error}
      />
      <Row justify="space-between">
        <Col sm={24} md={11}>
          <h3 style={{ margin: "50px 0" }}>Enter new password</h3>
          <Form onFinish={resetPassword}>
            {error ? (
              <p className="PasswordMatch">
                token is invalid
              </p>
            ) : null}
            {confirmPasswordError ? (
              <p className="PasswordMatch">
                password do not match
              </p>
            ) : null}
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
            <Form.Item
              rules={[{ required: true }]}
              name="confirmPassword"
              placeholder="password"
            >
              <Input
                name="password"
                type="password"
                className="custom-form"
                placeholder="Confirm Password *"
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

export default ResetPassword;
