import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./StoreFront.css";
import Collections from "../Collections/Collections";
import { DefaultButton } from "../UI/Buttons/Buttons";
import ItemInfo from "../UI/ItemInfo/ItemInfo";
import FeatureCategory from "../UI/FeatureCategory/FeatureCategory";
import CollectionBanner from "./CollectionBanner/CollectionBanner";
import BlogList from "./BlogList/BlogList";
import CatalogueBanner from "../UI/CatalogueBanner/CatalogueBanner";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import { useHistory } from "react-router-dom";

const StoreFront = () => {
  const [category, setCategory] = useState(null);
  const [collections, setCollections] = useState(null);
  const [loadingBestSeller, setLoadingBestSeller] = useState(false);
  const [bestSeller, setBestSeller] = useState(null);
  const [bestSellerError, setBestSellerError] = useState(false);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(false);
  const [newArrivals, setNewArrivals] = useState(null);
  const [NewArrivalsError, setNewArrivalsError] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [blogsError, setBlogsError] = useState(false);

  const history = useHistory();

  const fetchCategory = () => {
    const url = `${BASE_URL}/api/categories/`;
    axios.get(url).then((result) => {
      setCategory(result.data);
    });
  };

  const fetchCollections = () => {
    const url = `${BASE_URL}/api/collections/`;
    axios.get(url).then((result) => {
      setCollections(result.data);
    });
  };

  // const fetchProducts = (newUrl = null) => {
  //   let url = `${BASE_URL}/api/products/`;
  //   if (newUrl) {
  //     url = newUrl;
  //   }
  //   setLoading(true);
  //   setError(false);
  //   axios.get(url).then((result) => {
  //     setNextPage(result.data.next);
  //     setLoading(false);
  //     setError(false);
  //     if (newUrl) {
  //       setProducts((oldProducts) => [...oldProducts, result.data.results]);
  //     } else {
  //       setProducts(result.data.results);
  //     }
  //   });
  // };

  const fetchBestSellers = (newUrl = null) => {
    let url = `${BASE_URL}/api/products/?best_sellers=true`;
    if (newUrl) {
      url = newUrl;
    }
    setLoadingBestSeller(true);
    setBestSellerError(false);
    axios
      .get(url)
      .then((result) => {
        setLoadingBestSeller(false);
        setBestSellerError(false);
        if (newUrl) {
          setBestSeller((oldProducts) => [...oldProducts, result.data.results]);
        } else {
          setBestSeller(result.data.results);
        }
      })
      .catch(() => {
        setLoadingBestSeller(false);
        setBestSellerError(true);
      });
  };

  const fetchNewArrivals = (newUrl = null) => {
    let url = `${BASE_URL}/api/products/?new_arrivals=true`;
    if (newUrl) {
      url = newUrl;
    }
    setLoadingNewArrivals(true);
    setNewArrivalsError(false);
    axios
      .get(url)
      .then((result) => {
        setLoadingNewArrivals(false);
        setNewArrivalsError(false);
        if (newUrl) {
          setNewArrivals((oldProducts) => [
            ...oldProducts,
            result.data.results,
          ]);
        } else {
          setNewArrivals(result.data.results);
        }
      })
      .catch(() => {
        setLoadingNewArrivals(false);
        setNewArrivalsError(true);
      });
  };

  const fetchBlogs = () => {
    const url = `${BASE_URL}/api/blog?top=true`;
    setBlogsError(false);
    setLoadingBlogs(true);
    axios
      .get(url)
      .then((result) => {
        setBlogsError(false);
        setLoadingBlogs(false);
        setBlogs(result.data.results);
      })
      .catch(() => {
        setBlogsError(true);
        setLoadingBlogs(false);
      });
  };

  const fetchContents = () => {
    fetchCategory();
    fetchBlogs();
    fetchCollections();
    fetchBestSellers();
    fetchNewArrivals();
  };

  useEffect(() => {
    fetchContents();
  }, []);

  let categories;
  if (category) {
    categories = category.map((item) => (
      <ItemInfo
        title={item.title}
        image={item.image}
        stockCount={item.total_stock}
        key={item.id}
        id={item.title}
        isCollection={false}
      />
    ));
  }

  let bodyContent;
  if (loadingBestSeller && loadingNewArrivals && loadingBlogs) {
    bodyContent = <Loader />;
  } else if (bestSellerError && NewArrivalsError && blogsError) {
    bodyContent = <ErrorComponent onReload={fetchContents} />;
  } else if (bestSeller && newArrivals && blogs) {
    bodyContent = (
      <>
        <CatalogueBanner show={window.screen.width <= 480} />
        <div className="StoreFront">
          <Row gutter={{ md: 0, lg: 10, xl: 0 }} justify="space-around">
            <Col xs={0} lg={7}>
              <Collections data={collections} />
            </Col>
            <Col md={24} lg={17}>
              <div className="StoreFrontBanner">
                <h1>
                  QXB
                  <br />
                  Collect<span>io</span>ns
                </h1>
                <DefaultButton
                  background="black"
                  classNames="StoreFrontBannerBtn"
                  onClick={() => history.push("/catalogue")}
                >
                  DISCOVER MORE
                </DefaultButton>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="TopCategoriesContainer">
              <h3>Top categories</h3>
              <div className="TopCategories">{categories}</div>
            </div>
          </Row>
          <Row>
            <FeatureCategory
              bestSeller={bestSeller}
              newArrivals={newArrivals}
            />
            <div className="LinkCatalog">
              <DefaultButton
                onClick={() => history.push("/catalogue")}
                background="white"
              >
                GO TO CATALOG
              </DefaultButton>
            </div>
            <CollectionBanner />
          </Row>
        </div>
        <BlogList data={blogs} />
      </>
    );
  } else {
    bodyContent = null;
  }

  return bodyContent;
};

export default StoreFront;
