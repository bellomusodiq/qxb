import React, { useState } from "react";
import "./Cart.css";
import { Col, Row, Table } from "antd";
import img from "../../assets/images/product1.png";
import Summary from "../UI/Summary/Summary";

const Cart = () => {
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
      render: (quantity, dataRow) => (
        <div className="Counter">
          <div
            className="CounterButton"
            onClick={() => dataRow.setQuantity(-1)}
          >
            {" < "}
          </div>
          <div>{quantity}</div>
          <div className="CounterButton" onClick={() => dataRow.setQuantity(1)}>
            {" > "}
          </div>
        </div>
      ),
    },
    {
      title: "Sum",
      dataIndex: "amount",
      render: (text) => <b>{`$${text}`}</b>,
    },
    {
      title: "Delete",
      render: () => (
        <div className="DeleteBtn">
          <i className="far fa-times"></i>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([
    {
      img: img,
      key: "0",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      setQuantity: (value) => {},
    },
    {
      img: img,
      key: "1",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      setQuantity: (value) => {},
    },
    {
      img: img,
      key: "2",
      name: "QXB Vintage",
      amount: 28.85,
      quantity: 5,
      setQuantity: (value) => {},
    },
  ]);

  return (
    <div className="Cart">
      <Row gutter={50}>
        <Col md={17}>
          <Table columns={columns} dataSource={data} />
        </Col>
        <Col md={7}>
          <Summary />
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
