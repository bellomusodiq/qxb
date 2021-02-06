import React from "react";
import { Col, Row } from "antd";
import "./StoreFront.css";
import Collections from "../Collections/Collections";
import { DefaultButton } from "../UI/Buttons/Buttons";
import ItemInfo from "../UI/ItemInfo/ItemInfo";
import FeatureCategory from "../UI/FeatureCategory/FeatureCategory";
import CollectionBanner from "./CollectionBanner/CollectionBanner";
import BlogList from "./BlogList/BlogList";
import CatalogueBanner from "../UI/CatalogueBanner/CatalogueBanner";

const StoreFront = () => {
  return (
    <>
      <CatalogueBanner show={window.screen.width <= 480} />
      <div className="StoreFront">
        <Row gutter={{ md: 0, lg: 10, xl: 0 }} justify="space-around">
          <Col xs={0} lg={7}>
            <Collections />
          </Col>
          <Col md={24} lg={17}>
            <div className="StoreFrontBanner">
              <h1>
                QXB
                <br />
                Collect<span>io</span>ns
              </h1>
              <DefaultButton
                background="black"
                classNames="StoreFrontBannerBtn"
              >
                DISCOVER MORE
              </DefaultButton>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="TopCategoriesContainer">
            <h3>Top categories</h3>
            <div className="TopCategories">
              <ItemInfo />
              <ItemInfo />
              <ItemInfo />
              <ItemInfo />
              <ItemInfo />
            </div>
          </div>
        </Row>
        <Row>
          <FeatureCategory />
          <div className="LinkCatalog">
            <DefaultButton background="white">GO TO CATALOG</DefaultButton>
          </div>
          <CollectionBanner />
        </Row>
      </div>
      <BlogList />
    </>
  );
};

export default StoreFront;
