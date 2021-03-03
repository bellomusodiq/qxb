import * as actionTypes from "../types";

export const updateCarts = (payload) => {
  return {
    type: actionTypes.UPDATE_CARTS,
    payload,
  };
};
