import React, { useRef, useState } from "react";
import { Col, Row, Form } from "antd";
import { DataInput } from "../Accounts";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../store/actions/accounts";
import { BASE_URL } from "../../../CONFIG";
import axios from "axios";

const Contacts = () => {
  const account = useSelector((state) => state.account);
  const [accountSubmit, setAccountSubmit] = useState(false);
  const [passwordSubmit, setPasswordSubmit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSubmitLoading, setPasswordSubmitLoading] = useState(false);
  const [passwordSubmitError, setPasswordSubmitError] = useState(false);
  const [showPasswordDone, setShowPasswordDone] = useState(false);
  const [accountSubmitLoading, setAccountSubmitLoading] = useState(false);
  const [accountSubmitError, setAccountSubmitError] = useState();
  const [showAccountDone, setShowAccountDone] = useState(false);

  const accountRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const submitForms = () => {
    if (accountSubmit) {
      accountRef.current.submit();
    }
    if (passwordSubmit) {
      passwordRef.current.submit();
    }
  };

  const submitAccount = () => {
    const data = {
      name: account.name,
      email: account.email,
      phonenumber: account.phonenumber,
    };
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `JWT ${token}`,
    };
    const url = `${BASE_URL}/api/update-profile/${id}/`;
    setAccountSubmitLoading(true);
    setAccountSubmitError(false);
    axios
      .patch(url, data, { headers: headers })
      .then(() => {
        setAccountSubmitLoading(false);
        setShowAccountDone(true);
      })
      .catch(() => {
        setAccountSubmitLoading(false);
        setAccountSubmitError(true);
        setShowAccountDone(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAccountDone(false);
        }, 3000);
      });
  };

  const submitPassword = () => {
    if (confirmPassword !== newPassword) {
      return;
    }
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `JWT ${token}`,
    };
    const url = `${BASE_URL}/api/update-password/${id}/`;
    setPasswordSubmitLoading(true);
    setPasswordSubmitError(null);
    axios
      .put(url, data, { headers: headers })
      .then(() => {
        setPasswordSubmitLoading(false);
        setShowPasswordDone(true);
      })
      .catch((error) => {
        setPasswordSubmitLoading(false);
        setPasswordSubmitError(error.response.data);
        setShowPasswordDone(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowPasswordDone(false);
        }, 3000);
      });
  };

  const changeAccount = (field, value) => {
    setAccountSubmit(true);
    dispatch(updateProfile({ ...account, [field]: value }));
  };

  return (
    <Row justify="space-between">
      <Col xs={24} md={11}>
        <Form ref={accountRef} onFinish={submitAccount}>
          {showPasswordDone ? (
            <p
              className={
                showPasswordDone ? "success-feedback" : "error-feedback"
              }
            >
              {passwordSubmitError
                ? "password submit fail, try again, make sure old password is currect"
                : "password update successful"}
            </p>
          ) : null}
          {showAccountDone ? (
            <p
              className={
                showAccountDone ? "success-feedback" : "error-feedback"
              }
            >
              {accountSubmitError
                ? "account submit fail, something went wrong"
                : "account update successful"}
            </p>
          ) : null}
          <DataInput
            label="Name"
            placeholder="name"
            required
            name="name"
            value={account.name}
            onChange={(value) => changeAccount("name", value)}
          />
          <DataInput
            label="Phone number"
            placeholder="(212) 308-1220"
            name="phonenumber"
            value={account.phonenumber}
            onChange={(value) => changeAccount("phonenumber", value)}
          />
        </Form>
        <Form onFinish={submitPassword} ref={passwordRef}>
          <h3 style={{ fontWeight: "bold", margin: "30px 0" }}>
            Change Password
          </h3>
          <DataInput
            label="Password"
            placeholder="password"
            required
            name="password"
            value={oldPassword}
            onChange={(value) => {
              setOldPassword(value);
              setPasswordSubmit(true);
            }}
            type="password"
          />
          <DataInput
            label="New Password"
            placeholder="new password"
            required
            name="new_password"
            value={newPassword}
            onChange={(value) => {
              setNewPassword(value);
              setPasswordSubmit(true);
            }}
            type="password"
          />
          <DataInput
            label="Confirm Password"
            placeholder="confirm password"
            required
            name="confirm_password"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              setPasswordSubmit(true);
            }}
            type="password"
          />
        </Form>
        <div className="SaveChanges">
          <DefaultButton
            loading={passwordSubmitLoading || accountSubmitLoading}
            onClick={submitForms}
            background="black"
          >
            SAVE CHANGES
          </DefaultButton>
        </div>
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
};

export default Contacts;
