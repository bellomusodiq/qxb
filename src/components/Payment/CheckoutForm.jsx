import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_URL } from "../../CONFIG";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import { useHistory } from "react-router";
import { updateCarts } from "../../store/actions/carts";
import { fetchCart } from "../../App";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const account = useSelector((state) => state.account);
  const history = useHistory();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch(`${BASE_URL}/api/create-payment-intent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: localStorage.getItem("cartId"),
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const dispatch = useDispatch();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: account.orderEmail,
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
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
          axios.post(`${BASE_URL}/api/cart/`, {}).then((res) => {
            localStorage.setItem("cartId", res.data.id);
          })
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
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        })
        .catch(() => {
          setError(`Payment failed`);
          setProcessing(false);
        });
    }
  };

  return (
    <>
      <div className="CheckoutForm">
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button disabled={processing || disabled || succeeded} id="submit">
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
        </form>
      </div>
    </>
  );
}
