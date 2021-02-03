import React from "react";
import { DefaultButton } from "../UI/Buttons/Buttons";
import CatalogueBanner from "../UI/CatalogueBanner/CatalogueBanner";
import ProductItem from "../UI/ProductItems/ProductItem/ProductItem";
import Recommendation from "../UI/Recommendation/Recommendation";
import "./Catalogue.css";

const Catalogue = () => {
  return (
    <>
      <div className="BannerArea">
        <CatalogueBanner show />
      </div>
      <div className="Catalogue">
        <div className="ProductItems">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </div>
        <div className="LoadMore">
            <DefaultButton>LOAD MORE</DefaultButton>
        </div>
        <Recommendation title="Recommended" />
      </div>
    </>
  );
};

export default Catalogue;
