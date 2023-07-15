import React from 'react';
import { forwardRef } from 'react';
import Select from 'react-select';
import s from './SelectField.module.scss';

const customStyles = {
  placeholder: provided => ({
    ...provided,
    fontSize: '16px',
    color: 'var(--second-text-color)',
    pointerEvents: 'none',
  }),
};

const SelectField = forwardRef(
  (
    {
      name,
      value,
      handleChange,
      placeholder,
      required,
      options,
      className,
      defaultValue,
    },
    ref
  ) => {
    const labelClass = className ? `${s.label} ${s[className]}` : `${s.label}`;
    const selectClass = className
      ? `${s.select} ${s[className]}`
      : `${s.select}`;

    return (
      <label className={labelClass}>
        <Select
          classNamePrefix="custom-select"
          className={selectClass}
          name={name}
          value={value}
          onChange={handleChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          options={options.map(option => ({ value: option, label: option }))}
          styles={customStyles}
          ref={ref}
        />
      </label>
    );
  }
);
export default SelectField;
