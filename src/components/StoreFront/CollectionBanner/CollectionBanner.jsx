import React from "react";
import "./CollectionBanner.css";
import Banner2 from "../../../assets/images/collections2.png";

const CollectionBanner = () => {
  return (
    <div className="CollectionBanner">
      <div className="CollectionBanner1">
        <h1>QXB Winter Collection</h1>
      </div>
      <div>
        <div className="CollectionBanner2">
          <img src={Banner2} alt="banner 2" />
        </div>
        <div className="CollectionBanner3">
          <h3>QXB Collection</h3>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
