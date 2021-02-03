import React from "react";
import { Table } from "antd";
import "./Orders.css";
import img from "../../../assets/images/product1.png";

const Orders = () => {
  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (src) => <img width="50" height="50" alt="" src={src} />
    },
    {
      title: "Name of product",
      dataIndex: "name",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      render: (text) => <b>{`$${text}`}</b>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Sub-Total Amount",
      dataIndex: "subTotal",
      render: (text) => <b>{`$${text}`}</b>,
    },
  ].filter(item => {
    if (window.screen.width >= 500) {
      return item;
    } else {
      return item.title !== ""
    }
  })

  const data = [
    {
      img: img,
      key: "0",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      subTotal: 125.6,
    },
    {
      img: img,
      key: "1",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      subTotal: 125.6,
    },
    {
      img: img,
      key: "2",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      subTotal: 125.6,
    },
  ];


  return (
    <div className="Orders">
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};

export default Orders;
