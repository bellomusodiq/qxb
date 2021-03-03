import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  reviews: null,
  next: null,
  firstLoaded: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_REVIEWS:
      const { loading, error, reviews, next, firstLoaded } = action.payload;
      let newReviews = state.reviews;
      if (reviews) {
        if (state.reviews !== null && !state.firstLoaded) {
          newReviews = [...state.reviews, ...reviews];
        } else {
          newReviews = reviews;
        }
      }
      return {
        ...state,
        loading: loading !== null ? loading : state.loading,
        error: error !== null ? error : state.error,
        reviews: newReviews,
        next: next !== null ? next : state.next,
        firstLoaded: firstLoaded ? firstLoaded : state.firstLoaded,
      };
    default:
      return state;
  }
};

export default reducer;
