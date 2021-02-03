import React from "react";
import ProductItem from "./ProductItem/ProductItem";
import "./ProductItems.css";

const ProductItems = () => {
  return (
    <div className="ProductItems">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
    </div>
  );
};

export default ProductItems;
