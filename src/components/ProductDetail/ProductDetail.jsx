import React, { useState } from "react";
import { Col, Row } from "antd";
import "./ProductDetail.css";
import ProductImage from "../../assets/images/product1.png";
import StarReviews from "../UI/StarReviews/StarReviews";
import CustomSelect from "../UI/Select/Select";
import { DefaultButton } from "../UI/Buttons/Buttons";
import Cart from "../../assets/images/cart.svg";
import { Link } from "react-router-dom";
import CustomerReview from "../UI/CustomerReview/CustomerReview";
import Card from "../UI/Card/Card";

const ProductDetail = () => {
  const colors = ["#000000", "#146FF8", "#84519C", "#E36934"];
  const [colorIndex, setColorIndex] = useState(3);
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = (counter) => {
    if (quantity === 0 && counter === -1) return;
    setQuantity(quantity + counter);
  };
  return (
    <>
      <div className="ProductDetail">
        <Row gutter={20} justify="space-between">
          <Col md={18}>
            <Card>
              <div className="Product">
                <Row justify="space-between">
                  <Col md={12}>
                    <div className="ProductImagesContainer">
                      <div className="ProductImage">
                        <img src={ProductImage} alt="product" />
                      </div>
                      <div className="ProductImages">
                        <img src={ProductImage} alt="products" />
                        <img src={ProductImage} alt="products" />
                        <img src={ProductImage} alt="products" />
                      </div>
                    </div>
                  </Col>
                  <Col md={11}>
                    <div className="ProductPrice">
                      <h3>$ 12.90</h3>
                      <p>Per price</p>
                    </div>
                    <h2 className="ProductDetailTitle">
                      QXB Sleeveless Multicolored joggers
                    </h2>
                    <p className="Description">
                      In South Africa, the vast majority of video ads are made
                      for television. The reason for this is fairly simple: it
                      commands an incredible reach. TV’s reach in South Africa
                      was 82% in 2019, and in the two years before that it
                      fluctuated between the mid to high 80s. Marketers have
                      responded accordingly with TV’s share
                    </p>
                    <StarReviews productDetail rating={4.5} reviewsCount={8} />
                    <div className="ColorSelect">
                      <p>COLOR</p>
                      <div className="ColorSelectItems">
                        {colors.map((color, i) => (
                          <div
                            style={{ background: color }}
                            key={i}
                            className="ColorItem"
                            onClick={() => setColorIndex(i)}
                          >
                            {colorIndex === i ? (
                              <i className="fas fa-check"></i>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="SelectSize">
                      <CustomSelect
                        placeholder="Select size"
                        options={[
                          { value: "SX", name: "SX" },
                          { value: "SX", name: "SX" },
                          { value: "SX", name: "SX" },
                          { value: "SX", name: "SX" },
                        ]}
                      />
                    </div>
                    <div className="Quantities">
                      <p>Quantity</p>
                      <div className="Counter">
                        <div
                          className="CounterButton"
                          onClick={() => updateQuantity(-1)}
                        >
                          {" < "}
                        </div>
                        <div>{quantity}</div>
                        <div
                          className="CounterButton"
                          onClick={() => updateQuantity(+1)}
                        >
                          {" > "}
                        </div>
                      </div>
                    </div>
                    <DefaultButton
                      classNames="ProductDetailButton"
                      background="black"
                    >
                      <div className="AddToCartButton">
                        <img className="SvgIcon" src={Cart} alt="cart" />
                        <div>ADD TO CART</div>
                      </div>
                    </DefaultButton>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col className="ProductMoreCol" md={6}>
            <Card>
              <div className="ProductMore">
                <div className="">
                  <h4>Delivery Information</h4>
                  <p>
                    Normally delivered between Wednesday 13 Jan and Friday 15
                    Jan. Please check exact dates in the Checkout page.
                    <Link to="#home">See more</Link>
                  </p>
                </div>
                <div className="">
                  <h4>Return Policy</h4>
                  <p>
                    Free return within 15 days for QXB items and 7 days for
                    other eligible items.
                    <Link to="#home">See more</Link>
                  </p>
                </div>
                <div className="">
                  <h4>QXB Products</h4>
                  <p>
                    Free return within 15 days for QXB items and 7 days for
                    other eligible items Free return within 15 days for QXB
                    items and 7 days for other eligible items.Free return within
                    15 days for QXB items and 7 days for other eligible
                    items.Free return within 15 days for QXB items and 7 days
                    for other eligible items.Free return within 15 days for QXB
                    items and 7 days for other eligible items.Free return within
                    15 days for QXB items and 7<Link to="#home">See more</Link>
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="CustomerReviews">
        <CustomerReview />
        <CustomerReview />
        <CustomerReview />
      </div>
    </>
  );
};

export default ProductDetail;
