import { forwardRef } from 'react';

import s from './TextField.module.scss';

const TextField = forwardRef(({
  type,
  name,
  value,
  handleChange,
  placeholder,
  required,
  pattern,
  title,
  className,
}, ref) => {
  const spanClass = className ? `${s.span} ${s[className]}` : `${s.span}`;
  const labelClass = className ? `${s.label} ${s[className]}` : `${s.label}`;
  const inputClass = className ? `${s.input} ${s[className]}` : `${s.input}`;

  return (
    <label className={labelClass}>
      <input
        ref={ref}
        className={inputClass}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        pattern={pattern}
        title={title}
      />
      <span className={spanClass}>{placeholder}</span>
    </label>
  );
});
export default TextField;

TextField.defaultProps = {
  type: 'text',
  required: false,
};
