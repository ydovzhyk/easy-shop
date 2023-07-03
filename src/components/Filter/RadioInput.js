import { useState, useEffect, forwardRef } from 'react';
import { BiCheck } from 'react-icons/bi';
import s from './Filter.module.scss';

export const RadioInput = forwardRef(
  (
    { label, name, value, onChange, defaultChecked, setValue, ...rest },
    forwardedRef
  ) => {
    // const [radio, setRadio] = useState(false);

    // useEffect(() => {
    //   if (onChange) {
    //     onChange(checked);
    //   }
    // }, [checked, onChange]);

    const [radio, setRadio] = useState('');

    return (
      <>
        <input
          className={s.input_check}
          //   ref={forwardedRef}
          type="radio"
          //   name={name}
          //   id={value}
          //   value={value}
          //   onChange={handleChange}
          ref={forwardedRef}
          name={name}
          value={value}
          id={value}
          onChange={onChange}
        />
        <label htmlFor={value} className={s.labelCheckBox}>
          {/* <BiCheck
            size={22}
            style={{
              border: '1px solid var(--btn-border-color)',
            }}
            className={s.radioIcon}
          /> */}
          <span>{value}</span>
        </label>
      </>
    );
  }
);
