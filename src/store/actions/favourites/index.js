import * as actionTypes from "../types";

export const updateFavourite = (payload) => {
  return {
    type: actionTypes.UPDATE_FAVOURITES,
    payload,
  };
};
