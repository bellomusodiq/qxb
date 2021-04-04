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
  };

  return (
    <div>
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
