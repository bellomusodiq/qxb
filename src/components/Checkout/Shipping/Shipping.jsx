import React from "react";
import { Col, Row, Form, Input, Select } from "antd";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { DataInput } from "../Checkout";
import Summary from "../../UI/Summary/Summary";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../store/actions/accounts";

const Shipping = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  const changeAccount = (field, value) => {
    dispatch(updateProfile({ ...account, [field]: value }));
  };

  const onValuesChange = (e) => {
    console.log(e);
    for (let field in e) {
      changeAccount(field, e[field]);
    }
  };

  const countryOptions = [{ key: 1, value: "USA" }];
  const stateOptions = [{ key: 2, value: "TEXAS" }];

  return (
    <Row
      gutter={50}
      align="top"
      style={{ marginBottom: 30 }}
      justify="space-between"
    >
      <Col xs={24} md={11}>
        <Form
          onValuesChange={onValuesChange}
          onFinish={() => history.push("/checkout/payment")}
        >
          <Form.Item initialValue={account.address} rules={[{ required: true }]}>
            <DataInput initialValue={account.address} placeholder="Address" required name="address" />
          </Form.Item>
          <Form.Item initialValue={account.company} rules={[]}>
            <DataInput initialValue={account.company} placeholder="Company (Optional)" name="company" />
          </Form.Item>
          <Form.Item initialValue={account.city} rules={[{ required: true }]}>
            <DataInput initialValue={account.city} placeholder="City" required name="city" />
          </Form.Item>
          <Row gutter={30}>
            <Col xs={24} md={18}>
              <Row gutter={20} className="AddressDetails">
                <Col xs={8}>
                  <Form.Item name="country" rules={[{ required: true }]} initialValue={account.country}>
                    <Select
                      className="AddressSelect"
                      placeholder={"Select country"}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {countryOptions.map((option) => (
                        <Select.Option key={option.id} value={option.value}>
                          {option.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={8}>
                  <Form.Item
                    name="state"
                    rules={[{ required: true }]}
                    initialValue={account.state}
                  >
                    <Select
                      className="AddressSelect"
                      placeholder={"Select state"}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {stateOptions.map((option) => (
                        <Select.Option key={option.id} value={option.value}>
                          {option.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={8}>
                  <Form.Item
                    rules={[{ required: false }]}
                    name="postal"
                    placeholder="Postal code"
                    initialValue={account.postal}
                  >
                    <Input
                      name="postal"
                      className="custom-form"
                      placeholder="Postal code"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="Overview">
                <p style={{ fontWeight: "bold" }}>Delivery details:</p>
                <p className="green-text">pickup point - Name</p>
                <p>{account.address}</p>
                <p className="order-storage">Order storage period - 5 days</p>
              </div>
              <div className="ContinueCheckout">
                <DefaultButton type="submit" background="black">
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
