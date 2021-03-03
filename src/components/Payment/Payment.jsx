import react from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripe_pk } from "../../CONFIG";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";

const promise = loadStripe(stripe_pk);

const Payment = () => {
  return (
    <div className="Payments">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
