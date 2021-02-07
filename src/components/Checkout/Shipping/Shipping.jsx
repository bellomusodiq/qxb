import React from "react";
import { Col, Row, Form, Input } from "antd";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { DataInput } from "../Checkout";
import Summary from "../../UI/Summary/Summary";
import { useHistory } from "react-router-dom";
import CustomSelect from "../../UI/Select/Select";

const Shipping = () => {
  const history = useHistory();

  return (
    <Row
      gutter={50}
      align="top"
      style={{ marginBottom: 30 }}
      justify="space-between"
    >
      <Col xs={24} md={11}>
        <Form onFinish={() => history.push("/checkout/payment")}>
          <DataInput placeholder="Address" required name="address" />
          <DataInput placeholder="Company (Optional)" name="company" />
          <DataInput placeholder="City" required name="city" />
          <Row gutter={30}>
            <Col xs={24} md={18}>
              <Row gutter={20} className="AddressDetails">
                <Col xs={8}>
                  <CustomSelect
                    placeholder="Country"
                    options={[{ value: "USA", name: "USA" }]}
                    required
                  />
                </Col>
                <Col xs={8}>
                  <CustomSelect
                    placeholder="State"
                    options={[{ value: "Texas", name: "Texas" }]}
                    required
                  />
                </Col>
                <Col xs={8}>
                  <Form.Item
                    rules={[{ required: false }]}
                    name="postal_code"
                    placeholder="Postal code"
                  >
                    <Input
                      name="postal_code"
                      className="custom-form"
                      placeholder="Postal code"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div class="Overview">
                <p style={{fontWeight: "bold"}}>Delivery details:</p>
                <p class="green-text">pickup point - Name</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisi</p>
                <p class="order-storage">Order storage period - 5 days</p>
              </div>
              <div className="ContinueCheckout">
                <DefaultButton background="black">
                  CONTINUE TO PAYMENT
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

export default Shipping;
