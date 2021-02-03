import React from "react";
import ProductItem from "../ProductItems/ProductItem/ProductItem";
import "./Recommendation.css";

const Recommendation = ({ title }) => {
  return (
    <div className="Recommendation">
      <h2>{title}</h2>
      <div className="ProductItems RecommendedItems">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default Recommendation;
