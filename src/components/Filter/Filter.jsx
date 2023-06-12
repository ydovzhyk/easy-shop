import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { nanoid } from '@reduxjs/toolkit';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import Text from 'components/Shared/Text/Text';
import s from './Filter.module.scss';

const Filter = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  const handleChange = type => {
    switch (type) {
      case 'Розмір':
        setShowSizes(!showSizes);
        break;
      case 'Ціна':
        setShowPrices(!showPrices);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.optionsWrapper}>
      <h2 className={s.title}>Фільтри</h2>
      <OptionsHeader title="Розмір" onChange={handleChange} />
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
      <OptionsHeader title="Ціна" onChange={handleChange} />
      {showPrices && <h4>Показати ціну</h4>}
    </div>
  );
};

export default Filter;
