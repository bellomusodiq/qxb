import React from "react";
import Card from "../../Card/Card";
import "./ProductItem.css";
import StarReviews from "../../StarReviews/StarReviews";
import Cart from "../../../../assets/images/cart-black.svg";
import { CircleButton } from "../../Buttons/Buttons";
import { useHistory } from "react-router-dom";

const ProductItem = ({
  darkButton,
  rating,
  reviewsCount,
  image,
  title,
  price,
  id,
}) => {
  const history = useHistory();
  return (
    <div className="ProductItemContainer">
      <Card onClick={() => history.push(`/product/${id}`)}>
        <div className="ProductItem">
          <img src={image} alt="product item" />
          <div className="ProductItemContent">
            <StarReviews rating={rating} reviewsCount={reviewsCount} />
            <div className="ProductTitle">
              <h2>{title}</h2>
            </div>
            <div className="PriceCarts">
              <div className="Price">
                <h2>$ {price}</h2>
              </div>
              <div className="Carts">
                <CircleButton
                  background="black"
                  classNames={!darkButton ? "Favourite" : ""}
                >
                  <div className="Badged">
                    <i
                      className="far fa-heart"
                      style={{ color: darkButton ? "white" : "black" }}
                    ></i>
                  </div>
                </CircleButton>
                <CircleButton background="white" classNames="AddToCart">
                  <div className="Badged">
                    <img className="SvgIcon" src={Cart} alt="cart" />
                  </div>
                </CircleButton>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductItem;
