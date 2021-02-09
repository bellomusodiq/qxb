import React from "react";
import { Col, Input, Row } from "antd";
import "./CategorySection.css";
import Filter from "./Filter/Filter";
import ProductItem from "../UI/ProductItems/ProductItem/ProductItem";
import Recommendation from "../UI/Recommendation/Recommendation";
import { DefaultButton } from "../UI/Buttons/Buttons";
import BackgroundImg from "../../assets/images/category-banner.png";

const {Search} = Input;

const CategorySection = () => {
  return (
    <div className="CategorySection">
      <div className="CategoryBanner">
        <div>
          <p>Get this season’s</p>
          <p style={{ fontWeight: "bold" }}>NEW COLLECTIONS</p>
          <div className="DiscoverButton" >
            <DefaultButton background="black">DISCOVER MORE</DefaultButton>
          </div>
        </div>
        <img src={BackgroundImg} alt="category banner" />
      </div>
      <div className="SearchInput">
        <Search placeholder="Search" allowClear onSearch={(e) => console.log(e)} />
      </div>
      <Row gutter={{ md: 0, lg: 10, xl: 0 }} justify="space-between">
        <Col xs={0} lg={4}>
          <Filter />
        </Col>
        <Col md={24} lg={20}>
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
          </div>
          <div className="LoadMore">
            <DefaultButton>LOAD MORE</DefaultButton>
          </div>
          <Recommendation title="Recommended" />
        </Col>
      </Row>
    </div>
  );
};

export default CategorySection;
