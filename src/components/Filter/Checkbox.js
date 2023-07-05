import { useState, useEffect, forwardRef } from 'react';
import { BiCheck } from 'react-icons/bi';
import s from './Filter.module.scss';

export const Checkbox = forwardRef(
  ({ label, name, value, onChange, ...rest }, forwardedRef) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (onChange) {
        onChange(checked);
      }
    }, [checked, onChange]);

    const handleChechBoxClick = async e => {
      e.preventDefault();
      await setChecked(!checked);
    };

    return (
      <div onClick={handleChechBoxClick} style={{ cursor: 'pointer' }}>
        <input
          className={s.input_check}
          ref={forwardedRef}
          type="checkbox"
          name={name}
          id={value}
          value={value}
          checked={checked}
          onChange={e => {
            setChecked(e.target.checked);
          }}
        />
        <label htmlFor={value} className={s.labelCheckBox}>
          <div className={s.iconWrapper}>
            <BiCheck size={22} className={s.radioIcon} />
          </div>
          <span>{value}</span>
        </label>
      </div>
    );
  }
);
