import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  orders: null,
  previous: null,
  next: null,
  firstLoaded: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ORDER_LIST:
      const { loading, error, orders, previous, next, firstLoaded } = action.payload;
      return {
        ...state,
        loading: loading !== null ? loading: state.loading,
        error: error !== null ? error: state.error,
        orders: orders ? orders : state.orders,
        previous: previous !== null ? previous: state.previous,
        next: next !== null ? next : state.next,
        firstLoaded: firstLoaded ? firstLoaded : state.firstLoaded
      };
    default:
      return state;
  }
};

export default reducer;
