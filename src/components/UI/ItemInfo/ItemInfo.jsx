import React from "react";
import "./ItemInfo.css";
import { Col, Row, Typography } from "antd";
import Image from "../../../assets/images/top_product.png";

const { Text } = Typography;

const ItemInfo = () => {
  return (
    <div className="ItemInfo">
      <Row gutter={5}>
        <Col xs={4} style={{ marginRight: 20 }}>
          <img src={Image} alt="product img" />
        </Col>
        <Col xs={16}>
          <Row>
            <Text
              className="ItemInfoHeading"
              style={{ fontFamily: "Playfair Display" }}
            >
              Black Hoodies
            </Text>
          </Row>
          <Row>
            <Text
              className="ItemInfoText"
              style={{
                fontSize: "0.95em",
                opacity: 0.8,
                fontFamily: "Playfair Display",
              }}
            >
              In stock: 32
            </Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ItemInfo;
