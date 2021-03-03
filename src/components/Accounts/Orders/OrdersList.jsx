import React from "react";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../UI/Pagination/Pagination";
import { getOrders } from "../Accounts";

const OrdersList = () => {
  const data = useSelector((state) => state.orders.orders);
  const previous = useSelector((state) => state.orders.previous);
  const next = useSelector((state) => state.orders.next);
  const loading = useSelector((state) => state.orders.loading);

  const history = useHistory();
  const dispatch = useDispatch();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      render: (text) => <b>{`$${text}`}</b>,
    },
    {
      title: "Quantity",
      dataIndex: "product_count",
    },
    {
      title: "Date",
      dataIndex: "date"
    }
  ];

  const onRow = (record) => {
    return {
      onClick: () => history.push(`/accounts/my-orders/${record.id}`),
    };
  };

  return (
    <div className="OrdersList">
      <Table
        onRow={onRow}
        pagination={false}
        columns={columns}
        dataSource={data ? data : []}
        loading={loading}
      />
      <Pagination
        onClickNext={next ? () => getOrders(history, dispatch, next) : null}
        onClickPrevious={previous ? () => getOrders(history, dispatch, previous) : null}
      />
    </div>
  );
};

export default OrdersList;
