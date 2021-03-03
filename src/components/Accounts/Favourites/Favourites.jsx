import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../CONFIG";
import { DefaultButton } from "../../UI/Buttons/Buttons";
import ProductItem from "../../UI/ProductItems/ProductItem/ProductItem";
import { getFavourites } from "../Accounts";
import "./Favourites.css";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const next = useSelector((state) => state.favourites.next);
  const loading = useSelector((state) => state.favourites.loading);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="Favourites">
      <div className="ProductItems FavouritesItems">
        {favourites?.map((favourite) => (
          <ProductItem
            darkButton
            key={favourite.id}
            rating={favourite.product_obj.rating}
            reviewsCount={favourite.product_obj.reviews_count}
            image={BASE_URL + favourite.product_obj.image}
            title={favourite.product_obj.title}
            price={favourite.product_obj.price}
            id={favourite.product_obj.id}
          />
        ))}
      </div>
      {next ? (
        <div className="LoadMore">
          <DefaultButton
            loading={loading}
            onClick={() => getFavourites(history, dispatch, false, next)}
            background="black"
          >
            LOAD MORE
          </DefaultButton>
        </div>
      ) : null}
    </div>
  );
};

export default Favourites;
