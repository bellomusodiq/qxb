import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Summary from "../../UI/Summary/Summary";
import "./Payment.css";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../CONFIG";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../UI/Alert/Alert";
import { updateCarts } from "../../../store/actions/carts";

const PaymentItem = ({ title, description, selected, onClick }) => (
  <div onClick={onClick} className="PaymentItem">
    <div className="PaymentItemText">
      <p className="PaymentItemHeader">{title}</p>
      <p className="PaymentItemText">{description}</p>
    </div>
    <div className="PaymentItemIcon">
      <div
        className={
          selected ? "outer-circle outer-circle-active" : "outer-circle"
        }
      >
        <div
          className={
            selected ? "inner-circle inner-circle-active" : "inner-circle"
          }
        ></div>
      </div>
    </div>
  </div>
);

const Payment = () => {
  const [current, setCurrent] = useState("cashless");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const account = useSelector((state) => state.account);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitOrder = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/confirm-payment-intent/`, {
        cart_id: localStorage.getItem("cartId"),
        email: account.orderEmail || account.email,
        phone_number: account.orderPhonenumber || account.phonenumber,
        name: account.orderName || account.name,
        address: account.address,
        company: account.company,
        city: account.city,
        country: account.country,
        state: account.state,
        postal_code: account.postal,
      })
      .then((res) => {
        setLoading(false);
        setError(false);
        localStorage.removeItem("cartId");
        dispatch(
          updateCarts({
            loading: false,
            error: false,
            previous: null,
            next: null,
            carts: null,
            count: 0,
            totalAmount: 0,
          })
        );
        history.push("/orders/" + res.data[0].order);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <>
      <Alert
        show={error}
        message="Something went wrong!, try again"
        error={true}
      />
      <Row
        gutter={50}
        align="top"
        style={{ marginBottom: 30 }}
        justify="space-between"
      >
        <Col xs={24} md={17}>
          <div className="PaymentItems">
            <PaymentItem
              title="Card Payment"
              description="payment by card online"
              selected={current === "cashless"}
              onClick={() => setCurrent("cashless")}
            />
            <PaymentItem
              title="Cash Payment"
              description="Upon receipt of the goods"
              selected={current === "cash"}
              onClick={() => setCurrent("cash")}
            />
            {/* <PaymentItem
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
          /> */}
          </div>
          {/* <PaymentItem
            title="Apple Pay"
            description="Payment with apple wallet"
            selected={current === "applepay"}
            onClick={() => setCurrent("applepay")}
          /> */}
          {/* <PaymentItem
            title="Cash Payment"
            description="Uppon receipt of the goods"
            selected={current === "cash"}
            onClick={() => setCurrent("cash")}
          /> */}
          <div className="PaymentPageButton">
            {current !== "cash" ? (
              <DefaultButton
                onClick={() => history.push("/payments")}
                background="black"
                style={{ width: 250 }}
              >
                PROCEED TO PAYMENT
              </DefaultButton>
            ) : (
              <DefaultButton
                background="black"
                onClick={submitOrder}
                loading={loading}
                style={{ width: 250 }}
              >
                SUBMIT
              </DefaultButton>
            )}
          </div>
        </Col>
        <Col className="" xs={24} md={7}>
          <Summary hideButton />
        </Col>
      </Row>
    </>
  );
};

export default Payment;
