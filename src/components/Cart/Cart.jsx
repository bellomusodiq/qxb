import React, { useState } from "react";
import "./Cart.css";
import { Col, Row, Table } from "antd";
import Summary from "../UI/Summary/Summary";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../CONFIG";
import Alert from "../UI/Alert/Alert";
import axios from "axios";
import { fetchCartItems } from "../../App";
import Pagination from "../UI/Pagination/Pagination";

const Cart = () => {
  const loading = useSelector((state) => state.carts.loading);
  const carts = useSelector((state) => state.carts.carts);
  const next = useSelector((state) => state.carts.next);
  const previous = useSelector((state) => state.carts.previous);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [cartUpdateError, setCartUpdateError] = useState(false);

  const dispatch = useDispatch();

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
            onClick={() => dataRow.setQuantity(-1, dataRow.quantity)}
          >
            {" < "}
          </div>
          <div>{quantity}</div>
          <div
            className="CounterButton"
            onClick={() => dataRow.setQuantity(1, dataRow.quantity)}
          >
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
      render: (_, dataRow) => (
        <div onClick={dataRow.onDelete} className="DeleteBtn">
          <i className="fas fa-times"></i>
        </div>
      ),
    },
  ];

  const updateCartItem = (id, quantity) => {
    const url = `${BASE_URL}/api/cart-items/${id}/`;
    const data = {
      quantity,
    };
    axios
      .patch(url, data)
      .then(() => {
        setMessage("item updated successfully");
        setCartUpdateError(false);
        fetchCartItems(dispatch);
      })
      .catch(() => {
        setMessage("something went wrong, try again");
        setCartUpdateError(true);
      })
      .finally(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const deleteCartItem = (id) => {
    const url = `${BASE_URL}/api/cart-items/${id}/`;
    axios
      .delete(url)
      .then(() => {
        setMessage("item deleted successfully");
        setCartUpdateError(false);
        fetchCartItems(dispatch);
      })
      .catch(() => {
        setMessage("something went wrong, try again");
        setCartUpdateError(true);
      })
      .finally(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const data = carts?.map((item) => ({
    key: item.id,
    img: BASE_URL + item.product_obj.image,
    name: item.product_obj.title,
    quantity: item.quantity,
    amount: item.sub_total,
    setQuantity: (value) => {
      updateCartItem(item.id, item.quantity + value);
    },
    onDelete: () => {
      deleteCartItem(item.id);
    },
  }));

  return (
    <div className="Cart">
      <Alert show={showAlert} message={message} error={cartUpdateError} />
      <Row gutter={50}>
        <Col md={17}>
          <Table
            columns={columns}
            loading={loading}
            dataSource={data}
            pagination={false}
          />
          <Pagination
            onClickPrevious={
              previous ? () => fetchCartItems(dispatch, previous) : null
            }
            onClickNext={next ? () => fetchCartItems(dispatch, next) : null}
          />
        </Col>
        <Col md={7}>
          <Summary />
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
