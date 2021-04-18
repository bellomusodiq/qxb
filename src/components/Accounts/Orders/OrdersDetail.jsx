import React, { useEffect, useState } from "react";
import { Col, Divider, Row, Table } from "antd";
import { useLocation } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../../CONFIG";
import Loader from "../../UI/Loader/Loader";
import ErrorComponent from "../../UI/ErrorComponent/ErrorComponent";

const Item = ({ key_, value }) => (
  <Row style={{ margin: "10px 0" }} gutter={20}>
    <Col style={{ fontWeight: "bold" }} sm={6}>
      {key_}
    </Col>
    <Col sm={18}>{value}</Col>
  </Row>
);

const OrdersDetail = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [contact, setContact] = useState();

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
  const location = useLocation();

  const fetchOrder = () => {
    const id = location.pathname.split("/")[2];
    setLoading(true);
    setError(false);
    axios
      .get(`${BASE_URL}/api/order-items/?order=${id}`)
      .then((res) => {
        setContact(res.data.order_details);
        const data = res.data.order_items?.map((item) => ({
          key: item.id,
          img: BASE_URL + item.product_obj.image,
          name: item.product_obj.title,
          amount: item.product_obj.price,
          quantity: item.quantity,
          subTotal: item.sub_total,
        }));
        setData(data);
        setTotal(
          res.data.order_items[0] ? res.data.order_items[0].total_amount : 0
        );
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      {error ? <ErrorComponent onReload={fetchOrder} /> : null}
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <h1>Order Summary</h1>
          <Divider />
          <div className="OrderContact">
            <h2>Order Contact Info</h2>
            <Item key_={"Name"} value={contact.name} />
            <Item key_={"Email"} value={contact.email} />
            <Item key_={"Phonenumber"} value={contact.phone_number} />
            <Item key_={"Order Date"} value={contact.date} />
            <Item key_={"Country"} value={contact.country} />
            <Item key_={"City"} value={contact.city} />
            <Item key_={"Shipping Adress"} value={contact.shipping_address} />
            <Item key_={"Postal Code"} value={contact.postal_code} />
          </div>
          <Divider />
          <h2>Order Items</h2>
          <Table
            style={{ width: "100%", marginTop: 40 }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <div className="PaymentTotal">Total: ${total}</div>
        </div>
      ) : null}
    </>
  );
};

export default OrdersDetail;
