import React from "react";
import ProductItem from "./ProductItem/ProductItem";
import "./ProductItems.css";

const ProductItems = ({ data, hidePrices=false }) => {
  return (
    <div className="ProductItems">
      {data?.map((item) => (
        <ProductItem
          key={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          reviewsCount={item.reviews_count}
          image={item.image}
          id={item.id}
          hidePrices={hidePrices}
        />
      ))}
    </div>
  );
};

export default ProductItems;
