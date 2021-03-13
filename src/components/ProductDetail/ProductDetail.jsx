import React, { useEffect, useState } from "react";
import { Col, Row, Form, Select } from "antd";
import "./ProductDetail.css";
import StarReviews from "../UI/StarReviews/StarReviews";
import { DefaultButton } from "../UI/Buttons/Buttons";
import Cart from "../../assets/images/cart.svg";
import { Link, useParams } from "react-router-dom";
import CustomerReview from "../UI/CustomerReview/CustomerReview";
import Card from "../UI/Card/Card";
import { BASE_URL } from "../../CONFIG";
import axios from "axios";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import Alert from "../UI/Alert/Alert";
import { fetchCartItems } from "../../App";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(false);
  const [reviews, setReviews] = useState();
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [selectErrorMessage, setSelectErrorMessage] = useState();

  const { id } = useParams();

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const addToCart = () => {
    const url = `${BASE_URL}/api/cart-items/`;
    const data = {
      cart: localStorage.getItem("cartId"),
      product: id,
      quantity: 1,
      color: product.colors[colorIndex]?.id,
      size: currentSize,
    };
    axios
      .post(url, data)
      .then(() => {
        setError(false);
        setShowAlert(true);
        setMessage("added product to cart");
        fetchCartItems(dispatch);
      })
      .catch((error) => {
        if (error.response?.data?.non_field_errors) {
          setMessage("already added product to cart");
        } else {
          setMessage("something went wrong, try again");
        }
        setShowAlert(true);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const onAddToCart = (e) => {
    console.log(e);
    if (!currentSize) {
      setSelectErrorMessage("Please select a product size");
      return;
    }
    addToCart();
  };

  const updateQuantity = (counter) => {
    if (quantity === 1 && counter === -1) return;
    setQuantity(quantity + counter);
  };
  const fetchProduct = () => {
    const url = `${BASE_URL}/api/products/${id}/`;
    setProductLoading(true);
    setProductError(false);
    axios
      .get(url)
      .then((result) => {
        setProduct(result.data);
        setCurrentImage(result.data.image);
        setProductLoading(false);
        setProductError(false);
      })
      .catch(() => {
        setProductLoading(false);
        setProductError(true);
      });
  };
  const fetchReviews = () => {
    const url = `${BASE_URL}/api/reviews/?product=${id}`;
    setReviewsLoading(true);
    setReviewsError(false);
    axios
      .get(url)
      .then((result) => {
        setReviewsLoading(false);
        setReviewsError(false);
        setReviews(result.data.results);
      })
      .catch(() => {
        setReviewsLoading(false);
        setReviewsError(true);
      });
  };
  const fetchData = () => {
    fetchProduct();
    fetchReviews();
  };
  useEffect(() => {
    fetchData();
  }, []);
  let content;
  if (productLoading || reviewsLoading) {
    content = <Loader />;
  } else if (productError || reviewsError) {
    content = <ErrorComponent onReload={fetchData} />;
  } else if (product && reviews) {
    content = (
      <>
        <Alert show={showAlert} error={error} message={message} />
        <div className="ProductDetail">
          <Row gutter={20} justify="space-between">
            <Col md={18}>
              <Card>
                <div className="Product">
                  <Row justify="space-between">
                    <Col md={12}>
                      <div className="ProductImagesContainer">
                        <div className="ProductImage">
                          <img src={currentImage} alt="product" />
                        </div>
                        <div className="ProductImages">
                          {product.images.map((image, i) => (
                            <img
                              onClick={() =>
                                setCurrentImage(BASE_URL + image.image)
                              }
                              src={BASE_URL + image.image}
                              key={i}
                              alt="products"
                            />
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col md={11}>
                      <Form
                        onValuesChange={({ size }) => setCurrentSize(size)}
                        onFinish={onAddToCart}
                      >
                        <div className="ProductPrice">
                          <h3>$ {product.price}</h3>
                          <p>Per price</p>
                        </div>
                        <h2 className="ProductDetailTitle">{product.title}</h2>
                        <p className="Description">{product.description}</p>
                        <StarReviews
                          rating={product.rating}
                          reviewsCount={product.reviews_count}
                        />
                        <div className="ColorSelect">
                          <p>COLOR</p>
                          <div className="ColorSelectItems">
                            {product.colors.map((color, i) => (
                              <div
                                style={{ background: color.color }}
                                key={i}
                                className="ColorItem"
                                onClick={() => setColorIndex(i)}
                              >
                                {colorIndex === i ? (
                                  <i
                                    style={{ color: color.icon_color }}
                                    className="fas fa-check"
                                  ></i>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="SelectSize">
                          <Form.Item name="size" rules={[{ required: true }]}>
                            <Select
                              className="Select"
                              placeholder={"Select size"}
                              style={{ width: 120 }}
                            >
                              {product.sizes.map((option) => (
                                <Select.Option
                                  key={option.id}
                                  value={option.id}
                                >
                                  {option.size}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
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
                        {selectErrorMessage ? (
                          <p style={{ color: "tomato" }}>
                            {selectErrorMessage}
                          </p>
                        ) : null}
                        <DefaultButton
                          classNames="ProductDetailButton"
                          background="black"
                          type="submit"
                        >
                          <div className="AddToCartButton">
                            <img className="SvgIcon" src={Cart} alt="cart" />
                            <div>ADD TO CART</div>
                          </div>
                        </DefaultButton>
                      </Form>
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
                      {product.delivery_info.slice(0, 200)}
                      <Link to="#home">See more</Link>
                    </p>
                  </div>
                  <div className="">
                    <h4>Return Policy</h4>
                    <p>
                      {product.return_policy.slice(0, 200)}
                      <Link to="#home">See more</Link>
                    </p>
                  </div>
                  <div className="">
                    <h4>QxB Products</h4>
                    <p>
                      {product.qxb_products.slice(0, 400)}
                      <Link to="#home">See more</Link>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="CustomerReviews">
          {reviews.map((review) => (
            <CustomerReview {...review} key={review.id} />
          ))}
        </div>
      </>
    );
  } else {
    content = null;
  }
  return content;
};

export default ProductDetail;
