import React from "react";
import Tab from "../Tab/Tab";
import "./FeatureCategory.css";
import ProductItems from "../ProductItems/ProductItems";


const FeatureCategory = ({bestSeller, newArrivals}) => {

  const tabContent = [
    {
      title: "BEST SELLERS",
      key: "best_sellers",
      children: <ProductItems hidePrices data={bestSeller} />,
    },
  ];

  return (
    <div className="FeatureCategory">
      <Tab options={tabContent} />
    </div>
  );
};

export default FeatureCategory;
