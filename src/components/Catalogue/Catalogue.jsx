import React, { useEffect, useRef, useState } from "react";
import { DefaultButton } from "../UI/Buttons/Buttons";
import CatalogueBanner from "../UI/CatalogueBanner/CatalogueBanner";
import ProductItem from "../UI/ProductItems/ProductItem/ProductItem";
import Recommendation from "../UI/Recommendation/Recommendation";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import "./Catalogue.css";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import Alert from "../UI/Alert/Alert";
import { useLocation } from "react-router-dom";

const Catalogue = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const pathRef = useRef();

  const location = useLocation();

  pathRef.current = location;

  const parseCategory = (pathname) => {
    const pathnameSplit = pathname.split("/");
    if (pathnameSplit.length >= 3) {
      return pathnameSplit[2];
    }
  };

  const fetchProducts = (url, firstLoad = false) => {
    setLoading(true);
    setError(false);
    axios
      .get(url)
      .then((result) => {
        setInitialLoad(false);
        setNextPage(result.data.next);
        setLoading(false);
        setError(false);
        if (!firstLoad) {
          setProducts((oldProducts) => [
            ...oldProducts,
            ...result.data.results,
          ]);
        } else {
          setProducts(result.data.results);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setMessage("Oops, Something went wrong, Try again!");
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      });
  };

  const fetchRecommendedProducts = () => {
    const url = `${BASE_URL}/api/products/?recommended=true`;
    axios.get(url)
      .then(result => {
        setRecommendedProducts(result.data.results);
      })
  }

  const getUrl = () => {
    let url = `${BASE_URL}/api/products`;
    const category = parseCategory(location.pathname);
    if (category) {
      url += `?category=${category}`;
    }
    return url;
  }
  useEffect(() => {
    const url = getUrl();
    setInitialLoad(true);
    fetchProducts(url, true);
  }, [location]);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [])

  let bodyContent;
  if (loading && initialLoad) {
    bodyContent = <Loader />;
  } else if (error && !products) {
    bodyContent = <ErrorComponent onReload={() => fetchProducts(getUrl(), true)} />;
  } else if (products) {
    bodyContent = (
      <>
        <Alert error={error} show={showSnackBar} message={message} />
        <div className="BannerArea">
          <CatalogueBanner show />
        </div>
        <div className="Catalogue">
          <div className="ProductItems">
            {products?.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                price={product.price}
                title={product.title}
                image={product.image}
                reviewsCount={product.reviews_count}
                rating={product.rating}
              />
            ))}
          </div>
          {nextPage ? (
            <div className="LoadMore">
              <DefaultButton
                loading={products && loading}
                onClick={() => fetchProducts(nextPage)}
              >
                LOAD MORE
              </DefaultButton>
            </div>
          ) : null}
          <Recommendation data={recommendedProducts} title="Recommended" />
        </div>
      </>
    );
  } else {
    bodyContent = null;
  }

  return bodyContent;
};

export default Catalogue;
