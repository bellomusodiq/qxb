import React from "react";
import "./StarReviews.css";

const EmptyStar = () => <i className="far fa-star Star"></i>;
const SolidStar = () => <i className="fas fa-star Star SolidStar"></i>;
const HalfStar = () => <i className="fas fa-star-half-alt"></i>;

export const StarComponent = ({rating}) => {
  let isHalfStar = false;
  const wholeNumber = Math.floor(rating, 1);
  if (rating > wholeNumber) {
    isHalfStar = true;
  }
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < wholeNumber) {
      stars.push("solid");
    } else if (isHalfStar) {
      stars.push("half");
      isHalfStar = false;
    } else {
      stars.push("empty");
    }
  }
  return (
    <div className="Stars">
      {stars.map((type, i) => {
        if (type === "solid") {
          return <SolidStar key={i} />;
        } else if (type === "half") {
          return <HalfStar key={i} />;
        } else {
          return <EmptyStar key={i} />;
        }
      })}
    </div>
  );
};

const StarReviews = ({ rating, reviewsCount, productDetail }) => {
  return (
    <div
      className={
        productDetail ? "ProductStarReviews starReviews" : "starReviews"
      }
    >
      <StarComponent rating={rating} />
      <div className="Reviews">
        <i className="fas fa-comment-alt"></i>
        Reviews{" "}
        <span>
          (<span>{reviewsCount}</span>)
        </span>
      </div>
    </div>
  );
};

export default StarReviews;
