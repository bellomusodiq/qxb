import * as actionTypes from "../types";

export const updateReviews = (payload) => {
  return {
    type: actionTypes.UPDATE_REVIEWS,
    payload,
  };
};
