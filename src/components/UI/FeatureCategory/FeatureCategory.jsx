import React from "react";
import Tab from "../Tab/Tab";
import "./FeatureCategory.css";
import ProductItems from "../ProductItems/ProductItems";

const tabContent = [
  {
    title: "BEST SELLERS",
    key: "best_sellers",
    children: <ProductItems />,
  },
  {
    title: "NEW ARRIVALS",
    key: "new_arrivals",
    children: <ProductItems />,
  },
];

const FeatureCategory = () => {
  return (
    <div className="FeatureCategory">
      <h3>Featured Category</h3>
      <Tab options={tabContent} />
    </div>
  );
};

export default FeatureCategory;
