import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BASE_URL, stripe_pk } from "../../CONFIG";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";
import { useSelector } from "react-redux";
import Amex from "../../assets/images/amex.png";
import Visa from "../../assets/images/visa.png";
import Discover from "../../assets/images/discover.png";
import Jcb from "../../assets/images/jcb.png";
import MasterCard from "../../assets/images/master_card.png";

const promise = loadStripe(stripe_pk);

const ListItem = ({ key_, value }) => (
  <div className="ListItem">
    <div className="ListItemKey">{key_}</div>
    <div className="ListItemValue">{value}</div>
  </div>
);

const Payment = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, dataRow) => (
        <div className="CartName">
          <img width="50" height="50" alt="" src={dataRow.img} />
          <p>{dataRow.name}</p>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sum",
      dataIndex: "amount",
      render: (text) => <b>{`$${text}`}</b>,
    },
  ];

  const account = useSelector((state) => state.account);
  return (
    <div className="PaymentContainer">
      <div className="SummaryPayments">
        <div className="SummaryAddress">
          <ListItem key_="Address" value={account.address} />
          <ListItem key_="City" value={account.city} />
          <ListItem key_="Country" value={account.country} />
          <ListItem key_="Email" value={account.orderEmail} />
          <ListItem key_="Phone Number" value={account.orderPhonenumber} />
          <ListItem key_="Order Name" value={account.orderName} />
        </div>
        <div className="Payments">
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      <div className="Summary Cards">
        <img src={MasterCard} alt="master card" />
        <img src={Visa} alt="visa" />
        <img src={Amex} alt="amex" />
        <img src={Discover} alt="discover" />
        <img src={Jcb} alt="jcb" />
      </div>
    </div>
  );
};

export default Payment;
