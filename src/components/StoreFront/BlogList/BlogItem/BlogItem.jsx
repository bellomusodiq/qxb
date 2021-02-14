import React from "react";
import Card from "../../../UI/Card/Card";
import "./BlogItem.css";

const BlogItem = ({ title, body, date, image }) => (
  <div className="BlogItemContainer">
    <Card>
      <div className="BlogItem">
        <img src={image} alt="blog img" />
        <div className="BlogContent">
          <h4>{title}</h4>
          <p className="BlogDescription">
            {body.slice(0, 100)}
          </p>
          <p className="BlogDate">{date}</p>
        </div>
      </div>
    </Card>
  </div>
);

export default BlogItem;
