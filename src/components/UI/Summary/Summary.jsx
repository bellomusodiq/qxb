import React from "react";
import "./Summary.css";

const SummaryItem = ({ key_, value }) => (
  <div className="SummaryItem">
    <div className="Key">{key_}</div>
    <div className="DottedDivider"></div>
    <div className="Value">{value}</div>
  </div>
);

const Summary = () => (
  <div className="Summary">
    <SummaryItem key_="In the basket:" value={`2 items`} />
  </div>
);

export default Summary;
