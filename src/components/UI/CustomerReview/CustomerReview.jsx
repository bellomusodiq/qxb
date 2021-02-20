import React from "react";
import "./CustomerReview.css";
import { StarComponent } from "../StarReviews/StarReviews";
import Card from "../Card/Card";

const CustomerReview = ({ name, description, rating, date }) => (
  <Card>
    <div className="CustomerReview">
      <div className="NameRating">
        <h3>{name}</h3>
        <StarComponent rating={rating} />
      </div>
      <p>{description}</p>
      <div className="CustomerReviewFooter">
        <div className="CustomerReviewDate">{date}</div>
        {/* <div className="CustomerReviewDelete">{"x "} Delete</div> */}
      </div>
    </div>
  </Card>
);

export default CustomerReview;
