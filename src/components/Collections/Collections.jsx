import React from "react";
import Card from "../UI/Card/Card";
import "./Collections.css";
import { Typography } from "antd";
import ItemInfo from "../UI/ItemInfo/ItemInfo";

const { Title } = Typography;

const Collections = ({ data }) => {
  return (
    <div className="Collections">
      <Card >
        <div className="CollectionsCard">
          <Title className="CollectionsCardHeader" level={2}>
            QXB Collections
          </Title>
          {data
            ? data.map((item) => (
                <ItemInfo
                  title={item.title}
                  image={item.image}
                  stockCount={item.total_stock}
                  key={item.id}
                  id={item.title}
                />
              ))
            : null}
        </div>
      </Card>
    </div>
  );
};

export default Collections;
