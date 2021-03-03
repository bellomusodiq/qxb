import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./Orders.css";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../../CONFIG";
import Pagination from "../../UI/Pagination/Pagination";
import axios from "axios";
import Alert from "../../UI/Alert/Alert";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState();
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();

  const location = useLocation();

  const columns = [
    {
      title: "",
      dataIndex: "img",
      render: (src) => {
        return (
          <img className="OrderImage" width="50" height="50" alt="" src={src} />
        );
      },
    },
    {
      title: "Name of product",
      dataIndex: "name",
    },
    {
      title: "Amount",
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
  ].filter((item) => {
    if (window.screen.width >= 500) {
      return item;
    } else {
      return item.title !== "";
    }
  });

  const updatedData = (data = []) =>
    data?.map((item) => ({
      key: item.id,
      img: BASE_URL + item.product_obj.image,
      name: item.product_obj.title,
      amount: item.product_obj.price,
      quantity: item.quantity,
      subTotal: item.sub_total,
    }));

  const fetchOrder = (newUrl = null) => {
    const id = location.pathname.split("/")[3];
    const token = localStorage.getItem("token");
    let url = `${BASE_URL}/api/order-items/?order=${id}`;
    if (newUrl) {
      url = newUrl;
    }
    const headers = {
      Authorization: `JWT ${token}`,
    };
    setLoading(true);
    setError(false);
    axios
      .get(url, { headers: headers })
      .then((result) => {
        setLoading(false);
        setNext(result.data.next);
        setPrevious(result.data.previous);
        setOrders(result.data.results);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="Orders">
      <Alert show={error} message="something went wrong" error={true} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={updatedData(orders)}
        pagination={false}
      />
      <Pagination
        onClickNext={next ? () => fetchOrder(next) : null}
        onClickPrevious={previous ? () => fetchOrder(previous) : null}
      />
    </div>
  );
};

export default Orders;
