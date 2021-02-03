import React from "react";
import Card from "../UI/Card/Card";
import "./Collections.css";
import { Typography } from "antd";
import ItemInfo from "../UI/ItemInfo/ItemInfo";

const { Title, Text } = Typography;

const Collections = () => {
  return (
    <div className="Collections">
      <Card>
        <div className="CollectionsCard">
          <Title className="CollectionsCardHeader" level={2}>
            QXB Collections
          </Title>
          <ItemInfo />
          <ItemInfo />
          <ItemInfo />
          <ItemInfo />
          <ItemInfo />
        </div>
      </Card>
    </div>
  );
};

export default Collections;
