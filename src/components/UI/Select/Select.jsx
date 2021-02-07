import React from "react";
import { Select } from "antd";
import "./Select.css";

const { Option } = Select;

const CustomSelect = ({ options, onChange, placeholder, required }) => {
  return (
    <Select
      required={required}
      className="Select"
      placeholder={placeholder}
      style={{ width: 120 }}
      onChange={onChange}
    >
      {options.map((option, i) => (
        <Option key={i} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
