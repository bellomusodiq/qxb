import React from "react";
import "./CustomerReview.css";
import { StarComponent } from "../StarReviews/StarReviews";
import Card from "../Card/Card";

const CustomerReview = () => (
  <Card>
    <div className="CustomerReview">
      <div className="NameRating">
        <h3>Grodon Argonrand</h3>
        <StarComponent rating={5} />
      </div>
      <p>
        Free shipping within the U.S. only. 4) Offers are not applicable on the
        following brands: Bombabird Ceramics, Color Cord Company, Dims., Floyd,
        Inside Weather, Intelligent Change, Simply Framed and The Sill. 5)
        Minimum $1 USD purchase required for all orders.
      </p>
      <div className="CustomerReviewFooter">
        <div className="CustomerReviewDate">20.10.2019</div>
        <div className="CustomerReviewDelete">{"x "} Delete</div>
      </div>
    </div>
  </Card>
);

export default CustomerReview;
