import sizeOption from 'components/AddProduct/Size/sizeTable.json';
import { filterConditions } from '../components/Filter/filterСonditions';
import { filterPrices } from '../components/Filter/filterPrice';

export function getUrlFilterValues(filterData) {
  let selectedFilterValues = {};

  Object.entries(filterData).forEach(([key, value]) => {
    if (key === 'size' && value !== '[]') {
      let selectedSizeOptionsIndex = [];

      const sizeOptionsArray = Object.entries(sizeOption).map(([size]) => {
        return size;
      });

      const selectedSizeOptions = JSON.parse(filterData.size).map(
        ([{ name }]) => name
      );

      for (let i = 0; i < sizeOptionsArray.length; i += 1) {
        for (let j = 0; j < selectedSizeOptions.length; j += 1) {
          if (sizeOptionsArray[i] === selectedSizeOptions[j]) {
            selectedSizeOptionsIndex.push(i);
          }
        }
      }
      selectedFilterValues.size = selectedSizeOptionsIndex.join('_');
    }
    if (key === 'filterPrice' && value !== '') {
      const selectedFilterPriceIndex = filterPrices.findIndex(
        el => el === value
      );
      selectedFilterValues.price = selectedFilterPriceIndex;
    }
    // selectedFilterValues.price = value;

    if (key === 'filterPriceFrom' && value !== '0') {
      selectedFilterValues.price_from = value;
    }
    if (key === 'filterPriceTo' && value !== '1000000') {
      selectedFilterValues.price_to = value;
    }
    if (key === 'brandName' && value !== '') {
      selectedFilterValues.brand = value;
    }
    if (key === 'condition' && value.length > 0) {
      let selectedConditionOptionsIndex = [];

      for (let i = 0; i < filterConditions.length; i += 1) {
        for (let j = 0; j < value.length; j += 1) {
          if (filterConditions[i] === value[j]) {
            selectedConditionOptionsIndex.push(i);
          }
        }
      }
      selectedFilterValues.condition = selectedConditionOptionsIndex.join('_');
    }

    // selectedFilterValues.condition = value.join('_');
  });

  return selectedFilterValues;
}
