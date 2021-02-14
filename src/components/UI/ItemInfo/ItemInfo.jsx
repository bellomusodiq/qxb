import React from "react";
import "./ItemInfo.css";
import { Col, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Text } = Typography;

const ItemInfo = ({ title, image, stockCount, id, isCollection=true }) => {
  const history = useHistory();
  const navigate = () => {
    if (isCollection) {
      history.push(`/category/?collection=${id}`)
    } else {
      history.push(`/catalogue/${id}`)
    }
  }
  return (
    <div
      onClick={navigate}
      className="ItemInfo"
    >
      <Row gutter={5}>
        <Col xs={4} style={{ marginRight: 20 }}>
          <img src={image} alt="product img" />
        </Col>
        <Col xs={16}>
          <Row>
            <Text
              className="ItemInfoHeading"
              style={{ fontFamily: "Playfair Display" }}
            >
              {title}
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
              In stock: {stockCount}
            </Text>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ItemInfo;
