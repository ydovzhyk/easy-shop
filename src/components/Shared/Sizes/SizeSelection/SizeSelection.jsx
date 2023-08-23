import { useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Text from 'components/Shared/Text/Text';

import s from 'components/Shared/Sizes/SizeSelection/SizeSelection.module.scss';

const SizeSelection = ({
  sizeOption,
  defaultSelectedSizes,
  onSelectedSizesChange,
  isFormSubmitted,
  historySize,
}) => {
  const transformDefaultSelectedSizes = (defaultSelectedSizes, sizeOption) => {
    const transformedSizes = defaultSelectedSizes.map(selectedSize => {
      const { name, value } = selectedSize;
      const indexInSizeOption = sizeOption.findIndex(
        size => size[0].name === name
      );
      if (indexInSizeOption !== -1) {
        return [{ name: String(indexInSizeOption), value }];
      }
      return null;
    });

    return transformedSizes.filter(Boolean);
  };

  const transformedDefaultSelectedSizes = defaultSelectedSizes
    ? transformDefaultSelectedSizes(defaultSelectedSizes, sizeOption)
    : [];

  const [selectedSizes, setSelectedSizes] = useState(
    transformedDefaultSelectedSizes
  );

  const sizeValuesArray = sizeOption
    ? sizeOption.map(item => item[0].value)
    : [];

  const handleSizeClick = index => {
    let formattedSize = [];
    if (sizeValuesArray.hasOwnProperty(index)) {
      formattedSize.push({ name: index, value: sizeValuesArray[index] });
    } else {
      formattedSize.push({ name: index, value: index });
    }

    if (isSelected(index)) {
      setSelectedSizes(selectedSizes.filter(s => s[0].name !== index));
    } else {
      setSelectedSizes([...selectedSizes, formattedSize]);
    }
  };

  const isSelected = index => {
    return selectedSizes.some(s => s[0].name === index);
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
        textClass={
          sizeValuesArray.length > 1 ? 'productLabels' : 'productLabelsCard'
        }
      />
      <ul className={s.menuGroupList}>
        {Object.entries(sizeValuesArray).map(([index, values]) => {
          const isSelected = selectedSizes.some(selectedSize => {
            return selectedSize[0].name === index;
          });
          return (
            <li
              key={nanoid()}
              className={`${s.menuGroupItems} ${
                isSelected ? s.menuGroupItemsSelected : ''
              }`}
              onClick={() => handleSizeClick(index)}
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
