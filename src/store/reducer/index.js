import { combineReducers } from "redux";
import accountReducer from "./account";
import orderReducer from "./orders";
import reviewsReducer from "./reviews";
import favouritesReducer from "./favourites";
import cartsReducer from "./carts";


const rootReducer = combineReducers({
  account: accountReducer,
  orders: orderReducer,
  reviews: reviewsReducer,
  favourites: favouritesReducer,
  carts: cartsReducer,
});

export default rootReducer;
