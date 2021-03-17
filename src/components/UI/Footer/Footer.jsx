import React, { useState } from "react";
import { Input } from "antd";
import { DefaultButton } from "../Buttons/Buttons";
import "./Footer.css";

const year = new Date().getFullYear();

const Footer = () => {
  const [active, setActive] = useState("");

  return (
    <div className="Footer">
      <div className="FooterTop">
        <div
          onMouseEnter={() => setActive("social")}
          onMouseLeave={() => setActive("")}
          className="Social"
        >
          <div
            onMouseEnter={() => setActive("social")}
            onMouseLeave={() => setActive("")}
            className={active === "social" ? "FooterItems" : ""}
          >
            <a href="#home">
              <i className="fab fa-instagram"></i> <span>Instagram</span>
            </a>
            <a href="#home">
              <i className="fab fa-twitter"></i> <span>Twitter</span>
            </a>
            <a href="#home">
              <i className="fab fa-facebook"></i> <span>Facebook</span>
            </a>
            <a href="#home">
              <i className="fab fa-youtube"></i> <span>Youtube</span>
            </a>
            <a href="#home">
              <i className="fab fa-pinterest"></i> <span>Pinterest</span>
            </a>
          </div>
          <p
            onMouseEnter={() => setActive("social")}
            onMouseLeave={() => setActive("")}
          >
            Social
          </p>
        </div>
        <div
          onMouseEnter={() => setActive("company")}
          onMouseLeave={() => setActive("")}
          className="Company"
        >
          <div
            onMouseEnter={() => setActive("company")}
            onMouseLeave={() => setActive("")}
            className={active === "company" ? "FooterItems" : ""}
          >
            <a href="#home">About Us</a>
            <a href="#home">Careers</a>
            <a href="#home">Blog</a>
          </div>
          <p
            onMouseEnter={() => setActive("company")}
            onMouseLeave={() => setActive("")}
          >
            Company
          </p>
        </div>
        <div
          onMouseEnter={() => setActive("support")}
          onMouseLeave={() => setActive("")}
          className="Support"
        >
          <div
            onMouseEnter={() => setActive("support")}
            onMouseLeave={() => setActive("")}
            className={active === "support" ? "FooterItems" : ""}
          >
            <a href="#home">Contact Us</a>
            <a href="#home">Help Center</a>
            <a href="#home">Request a Product</a>
          </div>
          <p
            onMouseEnter={() => setActive("support")}
            onMouseLeave={() => setActive("")}
          >
            Support
          </p>
        </div>
        <div
          onMouseEnter={() => setActive("business")}
          onMouseLeave={() => setActive("")}
          className="Business"
        >
          <div
            onMouseEnter={() => setActive("business")}
            onMouseLeave={() => setActive("")}
            className={active === "business" ? "FooterItems" : ""}
          >
            <a href="#home">Become a Supplier</a>
            <a href="#home">Affiliates</a>
            <a href="#home">Partnerships</a>
          </div>
          <p
            onMouseEnter={() => setActive("business")}
            onMouseLeave={() => setActive("")}
          >
            Business
          </p>
        </div>
        <div
          onMouseEnter={() => setActive("subscribe")}
          onMouseLeave={() => setActive("")}
          className="Subscribe"
        >
          <div
            onMouseEnter={() => setActive("subscribe")}
            onMouseLeave={() => setActive("")}
            className={
              active === "subscribe"
                ? "FooterItems SubscribeForm"
                : "SubscribeForm"
            }
          >
            <Input />
            <DefaultButton background="black">Subscribe</DefaultButton>
          </div>
          <p
            onMouseEnter={() => setActive("subscribe")}
            onMouseLeave={() => setActive("")}
          >
            Subscribe
          </p>
        </div>
      </div>
      <div className="FooterBottom">
        <p>&copy; {year} QxB, LCC.</p>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
      </div>
    </div>
  );
};

export default Footer;
