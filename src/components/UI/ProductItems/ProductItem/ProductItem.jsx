import React, { useState } from "react";
import Card from "../../Card/Card";
import "./ProductItem.css";
import StarReviews from "../../StarReviews/StarReviews";
import { CircleButton } from "../../Buttons/Buttons";
import { useHistory } from "react-router-dom";
import { getFavourites } from "../../../Accounts/Accounts";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../../CONFIG";
import axios from "axios";
import Alert from "../../Alert/Alert";

const ProductItem = ({
  darkButton,
  rating,
  reviewsCount,
  image,
  title,
  price,
  id,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const favouritesMap = useSelector((state) => state.favourites.favouritesMap);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const addToFavourites = () => {
    const url = `${BASE_URL}/api/favourites/`;
    const data = {
      product: id,
      user: localStorage.getItem("userId"),
    };
    const headers = {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    axios
      .post(url, data, { headers: headers })
      .then(() => {
        setError(false);
        setShowAlert(true);
        setMessage("added product to favourites");
        getFavourites(history, dispatch, true);
      })
      .catch((error) => {
        if (error.response?.data?.non_field_errors) {
          setMessage("already added product to favourites");
        } else {
          setMessage("something went wrong, try again");
        }
        setShowAlert(true);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const removeFavourite = () => {
    const url = `${BASE_URL}/api/delete-favourites/${id}/`;
    const headers = {
      Authorization: `JWT ${localStorage.getItem("token")}`,
    };
    axios
      .delete(url, { headers: headers })
      .then(() => {
        setError(false);
        setShowAlert(true);
        setMessage("deleted product from favourites");
        getFavourites(history, dispatch, true);
      })
      .catch((error) => {
        setMessage("something went wrong, try again");
        setShowAlert(true);
        setError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const toggleFavourite = (e) => {
    e.stopPropagation();
    if (darkButton) {
      removeFavourite();
    } else {
      addToFavourites();
    }
  };

  const inFavourites = () => {
    return favouritesMap[id];
  };

  return (
    <>
      <Alert show={showAlert} error={error} message={message} />
      <div className="ProductItemContainer">
        <Card onClick={() => history.push(`/product/${id}`)}>
          <div className="ProductItem">
            <img src={image} alt="product item" />
            <div className="ProductItemContent">
              <StarReviews rating={rating} reviewsCount={reviewsCount} />
              <div className="ProductTitle">
                <h2>{title}</h2>
              </div>
              <div className="PriceCarts">
                <div className="Price">
                  <h2>$ {price}</h2>
                </div>
                {localStorage.getItem("token") ? (
                  <div className="Carts">
                    <CircleButton
                      onClick={toggleFavourite}
                      background="black"
                      classNames={!inFavourites() ? "Favourite" : "RemoveFavourite"}
                    >
                      <div className="Badged">
                        <i
                          className="far fa-heart"
                          style={{ color: inFavourites() ? "white" : "black" }}
                        ></i>
                      </div>
                    </CircleButton>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductItem;
