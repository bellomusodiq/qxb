import React from "react";
import { Col, Row, Form } from "antd";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { DataInput } from "../Checkout";
import Summary from "../../UI/Summary/Summary";
import { useHistory } from "react-router-dom";

const Contact = () => {
  const history = useHistory();

  return (
    <Row
      gutter={50}
      align="top"
      style={{ marginBottom: 30 }}
      justify="space-between"
    >
      <Col xs={24} md={11}>
        <Form onFinish={() => history.push("/checkout/shipping")}>
          <DataInput label="Name" placeholder="name" required name="name" />
          <DataInput placeholder="Phonenumber" required name="phone" />
          <DataInput placeholder="Email" required name="email" />
          <Row gutter={30}>
            <Col xs={24} md={18}>
              <div className="ContinueCheckout">
                <DefaultButton background="black">
                  CONTINUE TO SHIPPING
                </DefaultButton>
              </div>
            </Col>
            <Col xs={24} md={6}></Col>
          </Row>
        </Form>
      </Col>
      <Col className="" xs={24} md={7}>
        <Summary hideButton />
      </Col>
    </Row>
  );
};

export default Contact;
