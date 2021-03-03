import * as actionTypes from "../types";

export const updateOrders = (payload) => {
  return {
    type: actionTypes.UPDATE_ORDER_LIST,
    payload,
  };
};
