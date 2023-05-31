import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import sizeOption from './sizeTable.json';
import Text from 'components/Shared/Text/Text';
import s from './Size.module.scss';

const Size = ({ onSelectedSizesChange }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeClick = size => {
    let formattedSize = {};
    if (sizeOption.hasOwnProperty(size)) {
      formattedSize[size] = sizeOption[size];
    } else {
      formattedSize[size] = [{ [size]: size }];
    }

    if (selectedSizes.some(s => Object.keys(s)[0] === size)) {
      setSelectedSizes(selectedSizes.filter(s => Object.keys(s)[0] !== size));
    } else {
      setSelectedSizes([...selectedSizes, formattedSize]);
    }
  };

  useEffect(() => {
    onSelectedSizesChange(selectedSizes);
  }, [selectedSizes, onSelectedSizesChange]);

  return (
    <div className={s.sizeBox}>
      <ul className={s.menuGroupList}>
        {Object.entries(sizeOption).map(([size, values]) => {
          const isSelected = selectedSizes.some(
            s => Object.keys(s)[0] === size
          );

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
      {/* <div>
        <ul className={s.menuGroupList}>
          {selectedSizes.map(size => {
            const key = Object.keys(size)[0];
            const values = size[key];

            return (
              <li key={nanoid()}>
                <div>
                  {key === 'Інший' || key === 'One size' ? (
                    <Text text={key} textClass="title" />
                  ) : (
                    <>
                      <ul>
                        {values.map((value, index) => (
                          <li key={index}>
                            {Object.entries(value).map(([key, value]) => (
                              <Text
                                key={key}
                                text={`${key}: ${value}`}
                                textClass="title"
                              />
                            ))}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default Size;
