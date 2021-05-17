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
  const stateOptions = [
    {
      name: "Alabama",
      abbreviation: "AL",
    },
    {
      name: "Alaska",
      abbreviation: "AK",
    },
    {
      name: "American Samoa",
      abbreviation: "AS",
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
    },
    {
      name: "California",
      abbreviation: "CA",
    },
    {
      name: "Colorado",
      abbreviation: "CO",
    },
    {
      name: "Connecticut",
      abbreviation: "CT",
    },
    {
      name: "Delaware",
      abbreviation: "DE",
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC",
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM",
    },
    {
      name: "Florida",
      abbreviation: "FL",
    },
    {
      name: "Georgia",
      abbreviation: "GA",
    },
    {
      name: "Guam",
      abbreviation: "GU",
    },
    {
      name: "Hawaii",
      abbreviation: "HI",
    },
    {
      name: "Idaho",
      abbreviation: "ID",
    },
    {
      name: "Illinois",
      abbreviation: "IL",
    },
    {
      name: "Indiana",
      abbreviation: "IN",
    },
    {
      name: "Iowa",
      abbreviation: "IA",
    },
    {
      name: "Kansas",
      abbreviation: "KS",
    },
    {
      name: "Kentucky",
      abbreviation: "KY",
    },
    {
      name: "Louisiana",
      abbreviation: "LA",
    },
    {
      name: "Maine",
      abbreviation: "ME",
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH",
    },
    {
      name: "Maryland",
      abbreviation: "MD",
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
    },
    {
      name: "Michigan",
      abbreviation: "MI",
    },
    {
      name: "Minnesota",
      abbreviation: "MN",
    },
    {
      name: "Mississippi",
      abbreviation: "MS",
    },
    {
      name: "Missouri",
      abbreviation: "MO",
    },
    {
      name: "Montana",
      abbreviation: "MT",
    },
    {
      name: "Nebraska",
      abbreviation: "NE",
    },
    {
      name: "Nevada",
      abbreviation: "NV",
    },
    {
      name: "New Hampshire",
      abbreviation: "NH",
    },
    {
      name: "New Jersey",
      abbreviation: "NJ",
    },
    {
      name: "New Mexico",
      abbreviation: "NM",
    },
    {
      name: "New York",
      abbreviation: "NY",
    },
    {
      name: "North Carolina",
      abbreviation: "NC",
    },
    {
      name: "North Dakota",
      abbreviation: "ND",
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP",
    },
    {
      name: "Ohio",
      abbreviation: "OH",
    },
    {
      name: "Oklahoma",
      abbreviation: "OK",
    },
    {
      name: "Oregon",
      abbreviation: "OR",
    },
    {
      name: "Palau",
      abbreviation: "PW",
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA",
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR",
    },
    {
      name: "Rhode Island",
      abbreviation: "RI",
    },
    {
      name: "South Carolina",
      abbreviation: "SC",
    },
    {
      name: "South Dakota",
      abbreviation: "SD",
    },
    {
      name: "Tennessee",
      abbreviation: "TN",
    },
    {
      name: "Texas",
      abbreviation: "TX",
    },
    {
      name: "Utah",
      abbreviation: "UT",
    },
    {
      name: "Vermont",
      abbreviation: "VT",
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI",
    },
    {
      name: "Virginia",
      abbreviation: "VA",
    },
    {
      name: "Washington",
      abbreviation: "WA",
    },
    {
      name: "West Virginia",
      abbreviation: "WV",
    },
    {
      name: "Wisconsin",
      abbreviation: "WI",
    },
    {
      name: "Wyoming",
      abbreviation: "WY",
    },
  ];

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
          <Form.Item
            initialValue={account.address}
            rules={[{ required: true }]}
          >
            <DataInput
              initialValue={account.address}
              placeholder="Address"
              required
              name="address"
            />
          </Form.Item>
          <Form.Item initialValue={account.company} rules={[]}>
            <DataInput
              initialValue={account.company}
              placeholder="Company (Optional)"
              name="company"
            />
          </Form.Item>
          <Form.Item initialValue={account.city} rules={[{ required: true }]}>
            <DataInput
              initialValue={account.city}
              placeholder="City"
              required
              name="city"
            />
          </Form.Item>
          <Row gutter={30}>
            <Col xs={24} md={18}>
              <Row gutter={20} className="AddressDetails">
                <Col xs={8}>
                  <Form.Item
                    name="country"
                    rules={[{ required: true }]}
                    initialValue={account.country}
                  >
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
                        <Select.Option key={option.id} value={option.name}>
                          {option.name}
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
