import React from "react";
import { Col, Row, Form } from "antd";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import { DataInput } from "../Checkout";
import Summary from "../../UI/Summary/Summary";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../store/actions/accounts";

const Contact = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  const changeAccount = (field, value) => {
    dispatch(updateProfile({ ...account, [field]: value }));
  };

  const onValuesChange = (e) => {
    for (let field in e) {
      changeAccount(field, e[field]);
    }
  };

  return (
    <Row
      gutter={50}
      align="top"
      style={{ marginBottom: 30 }}
      justify="space-between"
    >
      <Col xs={24} md={11}>
        <Form
          onFinish={() => history.push("/checkout/shipping")}
          onValuesChange={onValuesChange}
        >
          <Form.Item initialValue={account.name} rules={[{ required: true }]}>
            <DataInput
              initialValue={account.name}
              label="Name"
              placeholder="name"
              required
              name="orderName"
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <DataInput
              initialValue={account.phonenumber}
              placeholder="Phonenumber"
              required
              name="orderPhonenumber"
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <DataInput
              initialValue={account.email}
              placeholder="Email"
              required
              name="orderEmail"
            />
          </Form.Item>
          <Row gutter={30}>
            <Col xs={24} md={18}>
              <div className="ContinueCheckout">
                <DefaultButton type="submit" background="black">
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
