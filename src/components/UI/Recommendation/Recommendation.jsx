import React from "react";
import ProductItem from "../ProductItems/ProductItem/ProductItem";
import "./Recommendation.css";

const Recommendation = ({ title, data, className }) => {
  return (
    <div className="Recommendation">
      <h2>{title}</h2>
      <div className={`ProductItems RecommendedItems ${className || ""}`}>
        {data?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            image={product.image}
            reviewsCount={product.reviews_count}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
