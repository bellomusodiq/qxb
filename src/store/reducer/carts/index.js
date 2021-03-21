import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  carts: null,
  next: null,
  previous: null,
  count: 0,
  totalAmount: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CARTS:
      const {
        loading,
        error,
        carts,
        next,
        previous,
        count,
        totalAmount,
      } = action.payload;
      return {
        ...state,
        loading: loading,
        error: error,
        carts: carts,
        next: next,
        previous: previous,
        count: count,
        totalAmount: totalAmount,
      };
    default:
      return state;
  }
};

export default reducer;
