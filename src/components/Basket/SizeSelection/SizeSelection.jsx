import { useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Text from 'components/Shared/Text/Text';

import s from 'components/Basket/SizeSelection/SizeSelection.module.scss';

const SizeSelection = ({
  sizeOption,
  onSelectedSizesChange,
  isFormSubmitted,
  historySize,
}) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const sizeValuesArray = sizeOption
    ? sizeOption.map(item => item[0].value)
    : [];

  const handleSizeClick = size => {
    let formattedSize = [];
    if (sizeValuesArray.hasOwnProperty(size)) {
      formattedSize.push({ name: size, value: sizeValuesArray[size] });
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
      <Text
        text={sizeValuesArray.length > 1 ? 'Оберіть розмір:' : 'Розмір:'}
        textClass="productLabels"
      />
      <ul className={s.menuGroupList}>
        {Object.entries(sizeValuesArray).map(([size, values]) => {
          const isSelected = selectedSizes.some(s => {
            return s[0].name === size;
          });
          return (
            <li
              key={nanoid()}
              className={`${s.menuGroupItems} ${
                isSelected ? s.menuGroupItemsSelected : ''
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {values.length > 1 ? (
                <div className={s.size}>
                  <Text
                    text={`EU: ${values[0].EU} / UA: ${values[1].UA} / IN: ${values[2].IN}`}
                    textClass="after-title-bigger"
                  />
                </div>
              ) : (
                <div className={s.size}>
                  <Text
                    text={`${Object.keys(sizeValuesArray[0][0])[0]}`}
                    textClass="after-title-bigger"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SizeSelection;
