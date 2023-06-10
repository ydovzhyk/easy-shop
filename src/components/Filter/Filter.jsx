import { useState, useEffect } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import Text from 'components/Shared/Text/Text';
import s from './Filter.module.scss';

const Filter = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  // const isDesctop = useMediaQuery({ minWidth: 1280 });

  return (
    <div>
      <h2>Фільтри</h2>

      {Object.entries(sizeOption).map(([size, values]) => {
        return (
          <table>
            <caption>Розмір</caption>
            <tbody>
              <tr key={nanoid()}>
                <td key={nanoid()}>
                  {values[0]}: {values[1]}, {values[2]}
                </td>
                {/* <td key={nanoid()}>
                  {values[0]}: {values[1]}, {values[2]}
                </td>
                <td key={nanoid()}>
                  {values[0]}: {values[1]}, {values[2]}
                </td> */}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default Filter;
