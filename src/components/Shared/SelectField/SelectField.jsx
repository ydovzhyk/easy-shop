import React from 'react';
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

const SelectField = ({
  name,
  value,
  handleChange,
  placeholder,
  required,
  options,
  classLabel = 'label',
  classSelect = 'select',
}) => {
  return (
    <label className={s[classLabel]}>
      <Select
        classNamePrefix="custom-select"
        className={s[classSelect]}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        options={options.map(option => ({ value: option, label: option }))}
        styles={customStyles}
      />
    </label>
  );
};

export default SelectField;
