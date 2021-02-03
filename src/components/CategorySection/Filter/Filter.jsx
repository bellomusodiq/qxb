import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import MarkerSelect from "../../UI/MarkerSelect/MarkerSelect";
import "./Filter.css";
import { Col, Row, Slider } from "antd";

const categoriesItem = [
  { title: "All", selected: false },
  { title: "Men", selected: false },
  { title: "Women", selected: false },
  { title: "Back Pack", selected: false },
  { title: "Hoodies", selected: false },
  { title: "All", selected: false },
];

const colors = [
  "#000000",
  "#146FF8",
  "#84519C",
  "#C716AA",
  "#FFFFFF",
  "#267113",
  "#2B2A74",
  "#8893BD",
];

const Filter = () => {
  const [categories, setCategories] = useState(categoriesItem || []);
  const [sliderRange, setSliderRange] = useState([10, 100]);
  return (
    <div className="Filter">
      <Card>
        <div className="FilterContent">
          <h2>Filters</h2>
          <Row style={{ marginTop: 20 }}>
            <h3>Categories</h3>
            {categories.map((category, i) => (
              <MarkerSelect
                key={i}
                title={category.title}
                selected={category.selected}
                // onSelect={() =>
                //   setCategories((current) => {
                //     current[i].selected = !current[i].selected;
                //   })
                // }
                onSelect={() => {}}
              />
            ))}
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h3>Size</h3>
            <MarkerSelect title="Small" />
            <MarkerSelect title="Medium" />
            <MarkerSelect title="Large" />
            <MarkerSelect title="Extra Large" />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h3>Price</h3>
            <Col xs={24} className="PriceValues">
              <div className="PriceValue">${sliderRange[0]}</div>
              <div className="Divider"></div>
              <div className="PriceValue">${sliderRange[1]}</div>
            </Col>
            <Col xs={24}>
              <Slider
                onChange={(value) => setSliderRange(value)}
                range
                min={1}
                max={1000}
                value={sliderRange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h3>Color</h3>
            <div className="ColorFilters">
              {colors.map((color, i) => (
                <div
                  style={{ background: color }}
                  key={i}
                  className="ColorFilter"
                ></div>
              ))}
            </div>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default Filter;
