import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { RiArrowUpSLine } from 'react-icons/ri';
import s from './OptionsHeader.module.scss';

const OptionsHeader = ({ title, onChange }) => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions(!showOptions);
    onChange(title);
  };

  const getClassName = () => {
    return showOptions ? `${s.operationIcon} ${s.active}` : s.operationIcon;
  };

  return (
    <div className={s.optionsBox} onClick={handleClick}>
      <h3 className={s.optionsTitle}>{title}</h3>
      <RiArrowUpSLine size={isDesctop ? 24 : 20} className={getClassName()} />
    </div>
  );
};

export default OptionsHeader;
