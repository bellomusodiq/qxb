import React, { useEffect } from "react";
import { Col, Row, Input } from "antd";
import { DefaultButton } from "../UI/Buttons/Buttons";
import "./Accounts.css";
import { NavLink, Route, useHistory } from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import Orders from "./Orders/Orders";
import Reviews from "./Reviews/Reviews";
import Favourites from "./Favourites/Favourites";
import { BASE_URL } from "../../CONFIG";
import axios from "axios";
import { updateProfile } from "../../store/actions/accounts";
import { updateOrders } from "../../store/actions/orders";
import { updateReviews } from "../../store/actions/reviews";
import { useDispatch, useSelector } from "react-redux";
import OrdersList from "./Orders/OrdersList";
import { updateFavourite } from "../../store/actions/favourites";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";

export const DataInput = ({
  placeholder,
  label,
  required,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <Row align="middle" style={{ margin: 15 }} gutter={30}>
      <Col xs={24} md={6}>
        {label}
      </Col>
      <Col xs={24} md={18}>
        <Input
          name={name}
          className="custom-form"
          placeholder={`${placeholder} *`}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
        />
      </Col>
    </Row>
  );
};

const checkAuth = (history) => {
  const id = localStorage.getItem("userId");
  if (!id) {
    history.push("/login");
  }
};

export const getProfile = (history, dispatch) => {
  checkAuth(history);
  const id = localStorage.getItem("userId");
  const url = `${BASE_URL}/api/profile/${id}/`;
  dispatch(updateProfile({ loading: true, error: false }));
  axios
    .get(url)
    .then((result) => {
      dispatch(
        updateProfile({
          ...result.data,
          loading: false,
          error: false,
          firstLoaded: true,
        })
      );
    })
    .catch((error) => {
      if (error.response.status === 401) {
        history.replace("/login");
      } else {
        dispatch(updateProfile({ loading: false, error: true }));
      }
    });
};

export const getOrders = (history, dispatch, newUrl = null) => {
  checkAuth(history);
  const userId = localStorage.getItem("userId");
  let url = `${BASE_URL}/api/order/?user=${userId}`;
  if (newUrl) {
    url = newUrl;
  }
  dispatch(updateOrders({ loading: true, error: false }));
  axios
    .get(url)
    .then((result) => {
      dispatch(
        updateOrders({
          loading: false,
          error: false,
          next: result.data.next,
          previous: result.data.previous,
          orders: result.data.results,
          firstLoaded: true,
        })
      );
    })
    .catch(() => {
      dispatch(
        updateOrders({
          loading: false,
          error: true,
        })
      );
    });
};

export const getReviews = (history, dispatch, newUrl = null) => {
  checkAuth(history);
  const userId = localStorage.getItem("userId");
  let url = `${BASE_URL}/api/reviews/?user=${userId}`;
  if (newUrl) {
    url = newUrl;
  }
  dispatch(updateReviews({ loading: true, error: false }));
  axios
    .get(url)
    .then((result) => {
      dispatch(
        updateReviews({
          loading: false,
          error: false,
          next: result.data.next,
          reviews: result.data.results,
          firstLoaded: true,
        })
      );
    })
    .catch(() => {
      dispatch(
        updateReviews({
          loading: false,
          error: true,
        })
      );
    });
};

export const getFavourites = (
  history,
  dispatch,
  firstLoaded = true,
  newUrl = null
) => {
  // checkAuth(history);
  const userId = localStorage.getItem("userId");
  let url = `${BASE_URL}/api/favourites/?user=${userId}`;
  const headers = {
    Authorization: `JWT ${localStorage.getItem("token")}`,
  };
  if (newUrl) {
    url = newUrl;
  }
  dispatch(updateFavourite({ loading: true, error: false }));
  axios
    .get(url, { headers: headers })
    .then((result) => {
      dispatch(
        updateFavourite({
          loading: false,
          error: false,
          favourites: result.data,
          firstLoaded: firstLoaded,
        })
      );
    })
    .catch(() => {
      dispatch(
        updateFavourite({
          loading: false,
          error: true,
        })
      );
    });
};

const Accounts = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.account.name);
  const accountLoading = useSelector((state) => state.account.loading);
  const ordersLoading = useSelector((state) => state.orders.loading);
  const reviewsLoading = useSelector((state) => state.reviews.loading);
  const favouritesLoading = useSelector((state) => state.favourites.loading);
  const firstLoaded = useSelector((state) => state.account.firstLoaded);
  const accountError = useSelector((state) => state.account.error);
  const ordersError = useSelector((state) => state.orders.error);
  const reviewsError = useSelector((state) => state.reviews.error);
  const favouritesError = useSelector((state) => state.favourites.error);

  const history = useHistory();

  const loadContents = () => {
    getProfile(history, dispatch);
    getOrders(history, dispatch);
    getReviews(history, dispatch);
  };

  useEffect(() => {
    loadContents();
  }, []);

  let bodyContent;

  if (
    !firstLoaded &&
    (accountLoading || ordersLoading || reviewsLoading || favouritesLoading)
  ) {
    bodyContent = <Loader />;
  } else if (
    !firstLoaded &&
    (accountError || ordersError || reviewsError || favouritesError)
  ) {
    bodyContent = <ErrorComponent onReload={loadContents} />;
  } else {
    bodyContent = (
      <div className="Accounts">
        <div className="AccountsHeader">
          <h2>Your Account</h2>
          <p>{name}</p>
        </div>
        <div className="AccountsNav">
          <NavLink exact activeClassName="AccountsNavActive" to="/accounts">
            <DefaultButton>Contact</DefaultButton>
          </NavLink>
          <NavLink
            exact
            activeClassName="AccountsNavActive"
            to="/accounts/my-orders"
          >
            <DefaultButton>My orders</DefaultButton>
          </NavLink>
          <NavLink
            exact
            activeClassName="AccountsNavActive"
            to="/accounts/my-reviews"
          >
            <DefaultButton>My reviews</DefaultButton>
          </NavLink>
          <NavLink
            exact
            activeClassName="AccountsNavActive"
            to="/accounts/favourites"
          >
            <DefaultButton>Favorites</DefaultButton>
          </NavLink>
        </div>
        <Route path="/accounts/my-orders/:id" exact component={Orders} />
        <Route path="/accounts/my-orders" exact component={OrdersList} />
        <Route path="/accounts/my-reviews" exact component={Reviews} />
        <Route path="/accounts/favourites" exact component={Favourites} />
        <Route path="/accounts" exact component={Contacts} />
      </div>
    );
  }

  return bodyContent;
};

export default Accounts;
