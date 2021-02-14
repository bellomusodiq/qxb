import React from "react";
import BlogItem from "./BlogItem/BlogItem";
import "./BlogList.css";

const BlogList = ({ data }) => {
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
        {data?.map((item) => (
          <BlogItem
            key={item.id}
            title={item.title}
            body={item.body}
            date={item.post_date}
            image={item.header_image}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
