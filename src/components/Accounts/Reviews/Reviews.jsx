import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import CustomerReview from "../../UI/CustomerReview/CustomerReview";
import { getReviews } from "../Accounts";
import "./Reviews.css";

const Reviews = () => {
  const reviews = useSelector((state) => state.reviews.reviews);
  const next = useSelector((state) => state.reviews.next);
  const loading = useSelector((state) => state.reviews.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <div className="MyReviews">
        {reviews?.map((review) => (
          <CustomerReview
            key={review.id}
            name={review.name}
            description={review.description}
            rating={review.rating}
            date={review.date}
          />
        ))}
      </div>
      {next ? (
        <div className="MyReviewsButton">
          <DefaultButton
            onClick={() => getReviews(history, dispatch, next)}
            loading={loading}
            background="black"
          >
            LOAD MORE
          </DefaultButton>
        </div>
      ) : null}
    </>
  );
};

export default Reviews;
