// import sizeOption from '../components/AddProduct/Size/sizeTable.json';

export function getUrlFilterValues(filterData) {
  let selectedFilterValues = {};

  // const sizeOptionsArray = Object.entries(sizeOption).map(([size]) => {
  //   return size;
  // });

  Object.entries(filterData).forEach(([key, value]) => {
    if (key === 'filterPrice' && value !== '') {
      selectedFilterValues.price = value;
    }
    if (key === 'filterPriceFrom' && value !== '0') {
      selectedFilterValues.price_from = value;
    }
    if (key === 'filterPriceTo' && value !== '1000000') {
      selectedFilterValues.price_to = value;
    }
    if (key === 'brandName' && value !== '') {
      selectedFilterValues.brandName = value;
    }
    if (key === 'condition' && value.length > 0) {
      selectedFilterValues.condition = value.join(',');
    }
  });

  return selectedFilterValues;
}
