import React from 'react';
import { Select } from 'antd';
import s from './Dropdown.module.scss';

const { Option } = Select;

const Dropdown = ({ value, handleChange }) => {
  const handleSelectChange = value => {
    handleChange(value);
  };

  return (
    <Select
      className={s.customSelectTop}
      defaultValue="show all"
      value={value}
      onChange={handleSelectChange}
    >
      <Option className={s.customSelectBottom} value="show all">
        Show all
      </Option>
      <Option className={s.customSelectBottom} value="type 1">
        Type 1
      </Option>
      <Option className={s.customSelectBottom} value="type 2">
        Type 2
      </Option>
    </Select>
  );
};

export default Dropdown;
