import React from "react";
import Card from "../../Card/Card";
import "./ProductItem.css";
import Image from "../../../../assets/images/product1.png";
import StarReviews from "../../StarReviews/StarReviews";
import Cart from "../../../../assets/images/cart-black.svg";
import { CircleButton } from "../../Buttons/Buttons";

const ProductItem = ({darkButton}) => (
  <div className="ProductItemContainer">
    <Card>
      <div className="ProductItem">
        <img src={Image} alt="product item" />
        <div className="ProductItemContent">
          <StarReviews rating={4.5} reviewsCount={8} />
          <div className="ProductTitle">
            <h2>QXB Sleeveless Multicolored joggers</h2>
          </div>
          <div className="PriceCarts">
            <div className="Price">
              <h2>$ 12.90</h2>
            </div>
            <div className="Carts">
              <CircleButton background="black" classNames={!darkButton ? "Favourite": ""} >
                <div className="Badged" >
                  <i className="far fa-heart" style={{color: darkButton? "white": "black"}} ></i>
                </div>
              </CircleButton>
              <CircleButton background="white" classNames="AddToCart" >
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

export default ProductItem;
