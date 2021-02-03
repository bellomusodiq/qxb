import React from "react";
import BlogItem from "./BlogItem/BlogItem";
import "./BlogList.css";

const BlogList = () => {
  return (
    <div className="BlogList">
      <h2>Blog Post</h2>
      <p>
        <a href="#abc">
          <span>See All</span>
          <i className="fas fa-arrow-right"></i>
        </a>
      </p>
      <div className="BlogItems">
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
};

export default BlogList;
