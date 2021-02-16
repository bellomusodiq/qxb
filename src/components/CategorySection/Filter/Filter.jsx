import React, { useState } from "react";
import Card from "../../UI/Card/Card";
import MarkerSelect from "../../UI/MarkerSelect/MarkerSelect";
import "./Filter.css";
import { Col, Row, Slider } from "antd";
import { DefaultButton } from "../../UI/Buttons/Buttons";

const Filter = ({
  categories,
  sizes,
  colors,
  query,
  filterSize,
  filterColor,
  filterRange,
  filterCategory,
  resetFilter
}) => {
  const [sliderRange, setSliderRange] = useState([
    query.has("lower") ? query.get("lower") : 0,
    query.has("upper") ? query.get("upper") : 100,
  ]);
  return (
    <div className="Filter">
      <Card>
        <div className="FilterContent">
          <h2>Filters</h2>
          <Row style={{ marginTop: 20 }}>
            <h3>Categories</h3>
            {categories.map((category) => (
              <MarkerSelect
                key={category.id}
                title={category.title}
                onSelect={() => filterCategory(category.title)}
                selected={
                  query.has("category")
                    ? query.get("category") === category.title
                    : false
                }
              />
            ))}
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h3>Size</h3>
            {sizes.map((size) => (
              <MarkerSelect
                key={size.id}
                title={size.size}
                onSelect={() => filterSize(size.size)}
                selected={
                  query.has("size") ? query.get("size") === size.size : false
                }
              />
            ))}
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
                onChange={(value) => {
                  setSliderRange(value);
                }}
                range
                onAfterChange={value => {
                  filterRange(value[0], value[1])
                }}
                min={1}
                max={1000}
                value={sliderRange}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h3>Color</h3>
            <div className="ColorFilters">
              {colors.map((color) => {
                return (
                <div
                  style={{ background: color.color }}
                  key={color.id}
                  className="ColorFilter"
                  onClick={() => filterColor(color.color)}
                >
                  {query.has("color") ? (
                    query.get("color") === color.color ? (
                      <i className="fas fa-check"></i>
                    ) : null
                  ) : null}
                </div>
              )})}
            </div>
          </Row>
          <div className="ResetButton">
            <DefaultButton background="black" onClick={resetFilter} >
              Reset
            </DefaultButton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Filter;
