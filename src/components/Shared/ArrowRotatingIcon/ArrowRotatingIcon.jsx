import { useState } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

import s from './ArrowRotatingIcon.module.scss';

const ArrowRotatingIcon = ({ type }) => {
  const [showSizes, setShowSizes] = useState(false);
  const [showPrices, setShowPrices] = useState(false);

  const handleArrowClick = type => {
    switch (type) {
      case 'size':
        setShowSizes(!showSizes);
        break;
      case 'price':
        setShowPrices(!showPrices);
        break;
      default:
        break;
    }
  };
  const getClassName = () => {
    return stateSwitch ? `${s.operationIcon} ${s.active}` : s.operationIcon;
  };
  return (
    <RiArrowUpSLine
      size={isDesctop ? 24 : 20}
      onClick={() => handleArrowClick(type)}
      className={getClassName()}
    />
  );
};

export default ArrowRotatingIcon;
