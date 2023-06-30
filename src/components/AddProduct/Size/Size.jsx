import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import sizeOption from './sizeTable.json';
import Text from 'components/Shared/Text/Text';
import s from './Size.module.scss';

const Size = ({ onSelectedSizesChange, isFormSubmitted, historySize }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeClick = size => {
    let formattedSize = [];
    if (sizeOption.hasOwnProperty(size)) {
      formattedSize.push({ name: size, value: sizeOption[size] });
    } else {
      formattedSize.push({ name: size, value: size });
    }

    if (isSelected(size)) {
      setSelectedSizes(selectedSizes.filter(s => s[0].name !== size));
    } else {
      setSelectedSizes([...selectedSizes, formattedSize]);
    }
  };

  const isSelected = size => {
    return selectedSizes.some(s => s[0].name === size);
  };

  useEffect(() => {
    onSelectedSizesChange(selectedSizes);
  }, [selectedSizes, onSelectedSizesChange]);

  useEffect(() => {
    if (isFormSubmitted) {
      setSelectedSizes([]);
    }
  }, [isFormSubmitted]);

  useEffect(() => {
    if (historySize) {
      setSelectedSizes(historySize);
    }
  }, [historySize]);

  return (
    <div className={s.sizeBox}>
      <ul className={s.menuGroupList}>
        {Object.entries(sizeOption).map(([size, values]) => {
          const isSelected = selectedSizes.some(s => s[0].name === size);
          return (
            <li
              key={nanoid()}
              className={`${s.menuGroupItems} ${
                isSelected ? s.menuGroupItemsSelected : ''
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {values.length > 1 ? (
                <Text
                  text={`EU: ${values[0].EU}`}
                  textClass="titleGroupItems"
                />
              ) : (
                <Text text={size} textClass="titleGroupItems" />
              )}
              {values.length > 1 && (
                <Text
                  text={`UA: ${values[1].UA}`}
                  textClass="after-title-bigger"
                />
              )}
              {values.length > 1 && (
                <Text
                  text={`IN: ${values[2].IN}`}
                  textClass="after-title-bigger"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Size;
