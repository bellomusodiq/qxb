import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "./StoreFront.css";
import FeatureCategory from "../UI/FeatureCategory/FeatureCategory";
import CollectionBanner from "./CollectionBanner/CollectionBanner";
import CatalogueBanner from "../UI/CatalogueBanner/CatalogueBanner";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import { Link, useHistory } from "react-router-dom";
import Slider from "../UI/Slider/Slider";

const Category = ({ image, title, quantity, link }) => (
  <Link to={link}>
    <div className="CategoryContainer">
      <div>
        <img src={image} alt="category" />
        <div className="TitleQty">
          <p>{title}</p>
          <p>{quantity}</p>
        </div>
      </div>
    </div>
  </Link>
);

const ImageSlider = ({ src, content }) => (
  <div
    className="StoreFrontBanner"
    style={{
      backgroundImage: `url(${src})`,
      width: "100%",
    }}
  >
    {content}
  </div>
);

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
  const [bannerImages, setBannerImages] = useState([]);

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
    const url = `${BASE_URL}/api/blog/?top=true`;
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

  const fetchBanner = () => {
    const url = `${BASE_URL}/api/banner-images/`;
    axios.get(url).then((res) => {
      const images = res.data.map((item) => ({
        children: () => <ImageSlider src={item.image} />,
      }));
      setBannerImages(images);
    });
  };

  const fetchContents = () => {
    fetchBanner();
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
      <Category
        key={item.id}
        image={item.image}
        title={item.title}
        quantity={item.total_stock}
        link={`/catalogue/${item.title}`}
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
        {/* <CatalogueBanner show={window.screen.width <= 480} /> */}
        <div className="StoreFront">
          <Row gutter={{ md: 0, lg: 10, xl: 0 }} justify="stretch">
            {/* <Col xs={0} lg={7}>
              <Collections data={collections} />
            </Col> */}
            <Col md={24} lg={24} sm={24}>
              {/* <div className="StoreFrontBanner">
                <h1>
                  QxB
                  <br />
                  Collections
                </h1>
                <DefaultButton
                  background="black"
                  classNames="StoreFrontBannerBtn"
                  onClick={() => history.push("/catalogue")}
                >
                  DISCOVER MORE
                </DefaultButton>
              </div> */}
              <Slider content={bannerImages} />
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
            <CollectionBanner />
          </Row>
        </div>
      </>
    );
  } else {
    bodyContent = null;
  }

  return bodyContent;
};

export default StoreFront;
