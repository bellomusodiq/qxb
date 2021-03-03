import React from "react";
import { Select } from "antd";
import "./Select.css";

const { Option } = Select;

const CustomSelect = ({ options, placeholder }) => {
  return (
    <Select
      className="Select"
      placeholder={placeholder}
      style={{ width: 120 }}
    >
      {options.map((option) => (
        <Option key={option.key} value={option.value}>
          {option.value}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
