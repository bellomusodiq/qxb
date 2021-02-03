import React from "react";
import CustomerReview from "../../UI/CustomerReview/CustomerReview";
import "./Reviews.css";

const Reviews = () => {
  return (
    <div className="MyReviews">
      <CustomerReview />
      <CustomerReview />
      <CustomerReview />
      <CustomerReview />
    </div>
  );
};

export default Reviews;
