import { Input } from "antd";
import React from "react";
import { DefaultButton } from "../Buttons/Buttons";
import "./Footer.css";

const year = new Date().getFullYear()

const Footer = () => (
  <div className="Footer">
    <div className="FooterTop">
      <div className="Social">
        <p>Social</p>
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
      <div className="Company">
        <p>Company</p>
        <a href="#home">About Us</a>
        <a href="#home">Careers</a>
        <a href="#home">Blog</a>
      </div>
      <div className="Support">
        <p>Support</p>
        <a href="#home">Contact Us</a>
        <a href="#home">Help Center</a>
        <a href="#home">Request a Product</a>
      </div>
      <div className="Business">
        <p>Business</p>
        <a href="#home">Become a Supplier</a>
        <a href="#home">Affiliates</a>
        <a href="#home">Partnerships</a>
      </div>
      <div className="Subscribe">
        <p>Subscribe</p>
        <div className="SubscribeForm">
          <Input />
          <DefaultButton background="black">Subscribe</DefaultButton>
        </div>
      </div>
    </div>
    <div className="FooterBottom">
      <p>&copy; {year} QxB, Inc.</p>
      <p>Privacy Policy</p>
      <p>Terms of Use</p>
    </div>
  </div>
);

export default Footer;
