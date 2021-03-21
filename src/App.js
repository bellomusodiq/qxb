import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Header from "./components/UI/Header/Header";
import StoreFront from "./components/StoreFront/StoreFront";
import Footer from "./components/UI/Footer/Footer";
import HeaderMobile from "./components/UI/HeaderMobile/HeaderMobile";
import Catalogue from "./components/Catalogue/Catalogue";
import CategorySection from "./components/CategorySection/CategorySection";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SideNav from "./components/UI/SideNav/SideNav";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Accounts, { getFavourites } from "./components/Accounts/Accounts";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { useDispatch } from "react-redux";
import { updateCarts } from "./store/actions/carts";
import { BASE_URL } from "./CONFIG";
import axios from "axios";
import Payment from "./components/Payment/Payment";
import OrdersDetail from "./components/Accounts/Orders/OrdersDetail";

export const fetchCartItems = (dispatch, newUrl = null) => {
  const cartId = localStorage.getItem("cartId");
  let url = `${BASE_URL}/api/cart-items/?cart=${cartId}`;
  if (newUrl) {
    url = newUrl;
  }
  dispatch(
    updateCarts({
      loading: true,
      error: false,
    })
  );
  axios
    .get(url)
    .then((result) => {
      dispatch(
        updateCarts({
          loading: false,
          error: false,
          previous: result.data.previous,
          next: result.data.next,
          carts: result.data.results,
          count: result.data.count,
          totalAmount: result.data.results[0]?.total_amount || 0,
        })
      );
    })
    .catch(() => {
      dispatch(
        updateCarts({
          loading: false,
          error: true,
        })
      );
    });
};

export const fetchCart = (dispatch) => {
  if (!localStorage.getItem("cartId")) {
    axios.post(`${BASE_URL}/api/cart/`, {}).then((res) => {
      localStorage.setItem("cartId", res.data.id);
      fetchCartItems(dispatch);
    });
  } else {
    fetchCartItems(dispatch);
  }
};

function App() {
  const [show, setShowSideNav] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchCart(dispatch);
    getFavourites(history, dispatch, true);
  }, []);

  return (
    <div className="App">
      <Header openSideNav={() => setShowSideNav(true)} />
      <SideNav show={show} close={() => setShowSideNav(false)} />
      <HeaderMobile openSideNav={() => setShowSideNav(true)} />
      <div style={{ minHeight: "calc(100vh - 10rem)" }}>
        <Switch>
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/catalogue/:id" component={Catalogue} />
          <Route path="/orders/:id" component={OrdersDetail} />
          <Route path="/catalogue" component={Catalogue} />
          <Route path="/cart" component={Cart} />
          <Route path="/category" component={CategorySection} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/payments" component={Payment} />
          <Route path="/" component={StoreFront} exact />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);
