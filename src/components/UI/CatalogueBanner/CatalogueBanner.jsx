import React from "react";
import "./CatalogueBanner.css";

const CatalogueBanner = ({ show }) => {
  return (
    <>
      {show ? (
        <div className="CatalogueBanner">
          <p style={{fontSize: '2em', margin: 0 }} >Get this season’s</p>
          <p style={{fontSize: '2em', marginTop: 15, fontWeight: "bold" }} >NEW COLLECTIONS</p>
        </div>
      ) : null}
    </>
  );
};

export default CatalogueBanner;
