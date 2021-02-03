import React from "react";
import ProductItem from "../../UI/ProductItems/ProductItem/ProductItem";
import "./Favourites.css";

const Favourites = () => {
  return (
    <div className="Favourites">
      <div className="ProductItems FavouritesItems">
        <ProductItem darkButton />
        <ProductItem darkButton />
        <ProductItem darkButton />
        <ProductItem darkButton />
      </div>
    </div>
  );
};

export default Favourites;
