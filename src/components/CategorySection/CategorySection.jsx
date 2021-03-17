import React, { useState, useEffect } from "react";
import { Col, Input, Row } from "antd";
import "./CategorySection.css";
import Filter from "./Filter/Filter";
import ProductItem from "../UI/ProductItems/ProductItem/ProductItem";
import Recommendation from "../UI/Recommendation/Recommendation";
import { DefaultButton } from "../UI/Buttons/Buttons";
import BackgroundImg from "../../assets/images/category-banner.png";
import Loader from "../UI/Loader/Loader";
import ErrorComponent from "../UI/ErrorComponent/ErrorComponent";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../CONFIG";
import LoadingComponent from "../UI/LoadingComponent/LoadingComponent";

const { Search } = Input;

const CategorySection = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [showSnackBar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);
  const [sizes, setSizes] = useState(null);
  const [sizesLoading, setSizesLoading] = useState(false);
  const [sizesError, setSizesError] = useState(false);
  const [colors, setColors] = useState(null);
  const [colorsLoading, setColorsLoading] = useState(false);
  const [colorsError, setColorsError] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);

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
    axios.get(url).then((result) => {
      setRecommendedProducts(result.data.results);
    });
  };

  const getUrl = () => {
    const url = `${BASE_URL}/api/products/?${query.toString()}`;
    return url;
  };

  const fetchCategories = () => {
    const url = `${BASE_URL}/api/categories/`;
    setCategoriesError(false);
    setCategoriesLoading(true);
    axios
      .get(url)
      .then((result) => {
        setCategories(result.data);
        setCategoriesLoading(false);
      })
      .catch(() => {
        setCategoriesError(true);
        setCategoriesLoading(false);
      });
  };

  const fetchSizes = () => {
    const url = `${BASE_URL}/api/product-sizes/`;
    setSizesError(false);
    setSizesLoading(true);
    axios
      .get(url)
      .then((result) => {
        setSizes(result.data);
      })
      .then(() => {
        setSizesError(true);
        setSizesLoading(false);
      });
  };

  const fetchColors = () => {
    const url = `${BASE_URL}/api/product-colors/`;
    setColorsError(false);
    setColorsLoading(true);
    axios
      .get(url)
      .then((result) => {
        setColors(result.data);
      })
      .then(() => {
        setColorsError(true);
        setColorsLoading(false);
      });
  };

  const loadFilters = () => {
    fetchCategories();
    fetchSizes();
    fetchColors();
  };

  useEffect(() => {
    const url = getUrl();
    setInitialLoad(true);
    fetchProducts(url, true);
  }, [location]);

  useEffect(() => {
    loadFilters();
    fetchRecommendedProducts();
  }, []);

  const setFilter = (key, value) => {
    if (query.has(key)) {
      query.delete(key);
    }
    query.set(key, value);
    history.push("/category?" + query.toString());
  };

  const resetFilter = () => {
    history.push("/category");
  };

  const setRanges = (lower, upper) => {
    if (query.has("lower")) {
      query.delete("lower");
    }
    if (query.has("upper")) {
      query.delete("upper");
    }
    query.set("lower", lower);
    query.set("upper", upper);
    history.push("/category?" + query.toString());
  };

  let categoryBody;
  if (error && !products) {
    categoryBody = (
      <ErrorComponent onReload={() => fetchProducts(getUrl(), true)} />
    );
  } else if (products) {
    categoryBody = (
      <>
        <div className="ProductItems CategoryProducts">
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
      </>
    );
  } else {
    categoryBody = null;
  }

  let filters;
  if (categoriesLoading || sizesLoading || colorsLoading) {
    filters = <Loader />;
  } else if (categories && sizes && colors) {
    filters = (
      <Filter
        categories={categories}
        sizes={sizes}
        colors={colors}
        filterSize={(size) => setFilter("size", size)}
        filterColor={(color) => setFilter("color", color)}
        filterCategory={(category) => setFilter("category", category)}
        filterRange={setRanges}
        query={query}
        resetFilter={resetFilter}
      />
    );
  } else if (categoriesError || sizesError || colorsError) {
    filters = <ErrorComponent onReload={loadFilters} />;
  } else {
    filters = null;
  }

  return (
    <div className="CategorySection">
      <div className="CategoryBanner">
        <div>
          <p>Get this season’s</p>
          <p style={{ fontWeight: "bold" }}>NEW COLLECTIONS</p>
          <div className="DiscoverButton">
            <DefaultButton background="black">DISCOVER MORE</DefaultButton>
          </div>
        </div>
        <img src={BackgroundImg} alt="category banner" />
      </div>
      <div className="SearchInput">
        <Search
          placeholder="Search"
          allowClear
          onSearch={(value) => setFilter("q", value)}
          defaultValue={query.has("q") ? query.get("q") : ""}
        />
      </div>
      <Row gutter={{ md: 0, lg: 10, xl: 0 }} justify="space-between">
        <Col xs={0} lg={4}>
          {filters}
        </Col>
        <Col md={24} lg={20}>
          {categoryBody}
          {loading ? <LoadingComponent /> : null}
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
          <Recommendation
            data={recommendedProducts}
            title="Recommended"
            className="CategoryProducts"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CategorySection;
