import * as actionTypes from "../../actions/types";

const INITIAL_STATE = {
  loading: false,
  error: false,
  favourites: [],
  count: 0,
  favouritesMap: {},
};

const favouriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FAVOURITES:
      const { loading, error, favourites } = action.payload;
      const favouritesMap = {};
      favourites?.map((favourite) => (favouritesMap[favourite.product_obj.id] = true));
      return {
        ...state,
        loading: loading !== null ? loading : state.loading,
        error: error !== null ? error : state.error,
        favourites,
        favouritesMap,
        count: favourites?.length || 0,
      };
    default:
      return state;
  }
};

export default favouriteReducer;
