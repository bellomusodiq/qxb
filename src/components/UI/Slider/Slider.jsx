import React from "react";
import Slider from "react-slick";

const AutoPlay = ({ content = [], slidesToShow = 1 }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false
  };

  return (
    <div style={{width: '100%', boxSizing: 'border-box'}} >
      <Slider {...settings}>
        {content.map((item, i) => (
          <div key={i}>
            <item.children />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoPlay;
