import React, { useRef, useState } from "react";
import { Col, Form, Input, Row } from "antd";
import "./Signup.css";
import { DefaultButton } from "../UI/Buttons/Buttons";
import { BASE_URL } from "../../CONFIG";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Alert from "../UI/Alert/Alert";

const Signup = () => {
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const formRef = useRef();
  const history = useHistory();
  const passwordMatchVerify = (data) => {
    if (data.password) {
      setPassword(data.password);
      if (confirmPassword && confirmPassword !== data.password) {
        setIsPasswordMatch(false);
      } else if (confirmPassword && confirmPassword === data.password) {
        setIsPasswordMatch(true);
      }
    }
    if (data.confirm_password) {
      setConfirmPassword(data.confirm_password);
      if (password && password !== data.confirm_password) {
        setIsPasswordMatch(false);
      } else if (password && password === data.confirm_password) {
        setIsPasswordMatch(true);
      }
    }
  };
  const signup = (data) => {
    if (isPasswordMatch) {
      const url = `${BASE_URL}/api/signup/`;
      setLoading(true);
      setError(false);
      setSuccess(true);
      axios
        .post(url, data)
        .then(() => {
          setLoading(false);
          setSuccess(true);
          setShowAlert(true);
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          setShowAlert(true);
          setSuccess(false);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    }
  };
  return (
    <div className="Signup">
      <Alert
        message={
          success
            ? "signup is successful, redirecting to login"
            : "something went wrong, try agian"
        }
        show={showAlert}
        error={error}
      />
      <Row justify="space-between">
        <Col sm={24} md={11}>
          <Form
            ref={formRef}
            onFinish={signup}
            onValuesChange={passwordMatchVerify}
          >
            <Form.Item
              rules={[{ required: true }]}
              name="name"
              placeholder="name"
            >
              <Input
                name="name"
                className="custom-form"
                placeholder="Name *"
                required
              />
            </Form.Item>
            {error ? (
              <p className="PasswordMatch">
                user with this email already exist
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
            {!isPasswordMatch ? (
              <p className="PasswordMatch">password does not match</p>
            ) : null}
            <Form.Item
              rules={[{ required: true }]}
              name="confirm_password"
              placeholder="confirm_password"
            >
              <Input
                name="confirmPassword"
                className="custom-form"
                placeholder="Confirm Password *"
                type="password"
                required
              />
            </Form.Item>
            <div className="SignupButton">
              <DefaultButton type="submit" background="white" loading={loading}>
                SIGN UP
              </DefaultButton>
            </div>
          </Form>
        </Col>
        <Col className="AlternateSignin" md={12}>
          <p>Do you already have a personal account?</p>
          <p style={{ margin: "50px 0" }}>
            <span>
              <Link to="/login">Log in</Link>
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

export default Signup;
