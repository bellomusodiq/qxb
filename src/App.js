import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import Accounts from "./components/Accounts/Accounts";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [show, setShowSideNav] = useState(false);
  return (
    <div className="App">
      <Router>
        <Header />
        <SideNav show={show} close={() => setShowSideNav(false)} />
        <HeaderMobile openSideNav={() => setShowSideNav(true)} />
        <Switch>
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/catalogue" component={Catalogue} />
          <Route path="/cart" component={Cart} />
          <Route path="/category" component={CategorySection} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={StoreFront} exact />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
