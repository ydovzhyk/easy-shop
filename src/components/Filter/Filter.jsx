import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { nanoid } from '@reduxjs/toolkit';
import { RiArrowUpSLine } from 'react-icons/ri';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import Text from 'components/Shared/Text/Text';
import s from './Filter.module.scss';

const Filter = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
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
    return showSizes || showPrices
      ? `${s.operationIcon} ${s.active}`
      : s.operationIcon;
  };

  return (
    <div className={s.optionsWrapper}>
      <h2 className={s.title}>Фільтри</h2>
      <div className={s.optionsBox}>
        <h3 className={s.optionsTitle}>Розмір</h3>
        <RiArrowUpSLine
          size={isDesctop ? 24 : 20}
          onClick={() => handleArrowClick('size')}
          className={getClassName()}
        />
      </div>
      {showSizes && (
        <ul className={s.sizeGroupList}>
          {Object.entries(sizeOption).map(([size, values]) => {
            return (
              <li key={nanoid()} className={s.sizeGroupItem}>
                {values.length > 1 ? (
                  <Text
                    text={`EU: ${values[0].EU}`}
                    textClass="sizeGroupMainTextContent"
                  />
                ) : (
                  <Text text={size} textClass="sizeGroupMainTextContent" />
                )}
                {values.length > 1 && (
                  <Text
                    text={`UA: ${values[1].UA}`}
                    textClass="sizeGroupTextContent"
                  />
                )}
                {values.length > 1 && (
                  <Text
                    text={`IN: ${values[2].IN}`}
                    textClass="sizeGroupTextContent"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className={s.optionsBox}>
        <h3 className={s.optionsTitle}>Ціна</h3>
        <RiArrowUpSLine
          size={isDesctop ? 24 : 20}
          onClick={() => handleArrowClick('price')}
          className={getClassName()}
        />
      </div>
    </div>
  );
};

export default Filter;
