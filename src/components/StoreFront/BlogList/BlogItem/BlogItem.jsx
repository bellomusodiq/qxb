import React from "react";
import Card from "../../../UI/Card/Card";
import "./BlogItem.css";
import Image from "../../../../assets/images/blog.png";

const BlogItem = () => (
  <div className="BlogItemContainer">
    <Card>
      <div className="BlogItem">
        <img src={Image} alt="blog img" />
        <div className="BlogContent">
          <h4>Title name news or articles, planned on this site</h4>
          <p className="BlogDescription">
            A small description of the article and news on this site
          </p>
          <p className="BlogDate">12.11.2020</p>
        </div>
      </div>
    </Card>
  </div>
);

export default BlogItem;
