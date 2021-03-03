import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  next: null,
  favourites: null,
  firstLoaded: false,
  count: 0
};

const favouriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FAVOURITES:
      const { loading, error, next, favourites, firstLoaded, count } = action.payload;
      let newFavourites = state.favourites;
      if (favourites) {
        if (!firstLoaded && (state.favourites !== null)) {
          newFavourites = [...state.favourites, ...favourites];
        } else {
          newFavourites = favourites;
        }
      }
      return {
        ...state,
        loading: loading !== null ? loading : state.loading,
        error: error !== null ? error : state.error,
        next: next !== null ? next : state.next,
        favourites: newFavourites,
        firstLoaded: true,
        count: count || state.count
      };
    default:
      return state;
  }
};

export default favouriteReducer;
