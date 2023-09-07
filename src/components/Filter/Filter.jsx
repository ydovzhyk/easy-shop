import { useState, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import { useForm } from 'react-hook-form';

import { useSearchParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { getFilterProduct } from 'redux/product/product-selectors';
import {
  showFilterProduct,
  unSubmitFilterForm,
  submitFilterForm,
  hideFilterInMobile,
} from 'redux/product/product-slice';

import Text from 'components/Shared/Text/Text';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import { filterPrices } from './filterPrice';
import { filterConditions } from './filterСonditions';
import useScreenResizing from '../../funcs&hooks/useScreenResizing';

import s from './Filter.module.scss';

const Filter = ({ onChange }) => {
  const [filterData, setFilterData] = useState({});
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [showCondition, setShowCondition] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const shouldFilterProductReset = useSelector(getFilterProduct);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const brandName = searchParams.get('brand');
  const filterPriceFrom = searchParams.get('price_from');
  const filterPriceTo = searchParams.get('price_to');
  const filterPrice = searchParams.get('price');
  const condition = searchParams.get('condition');
  const size = searchParams.get('size');

  const viewPort = useScreenResizing();
  const isMobile = viewPort.width < 768;
  const isDesktop = viewPort.width > 1279;

  const {
    handleSubmit,
    register,
    resetField,
    setValue,
    reset,
    watch,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      filterCondition: [],
      filterPriceRadio: '',
      filterPriceFrom: '',
      filterPriceTo: '',
      filterBrand: '',
    },
  });
  const watchPriceFrom = watch('filterPriceFrom');
  const watchPriceRadio = watch('filterPriceRadio');

  //обробка компоненту при завантаженні сторінки з відсутніми URL-параметрами//
  useEffect(() => {
    if (!size) {
      setSelectedSizes([]);
    }
    if (!filterPrice) {
      resetField('filterPriceRadio', { defaultValue: '' });
    }
    if (!filterPriceFrom) {
      resetField('filterPriceFrom', { defaultValue: '' });
    }
    if (!filterPriceTo) {
      resetField('filterPriceTo', { defaultValue: '' });
    }
    if (!condition) {
      resetField('filterCondition', { defaultValue: [] });
    }
    if (!brandName) {
      resetField('filterBrand', { defaultValue: '' });
    }
    return;
  }, [
    filterPrice,
    brandName,
    condition,
    filterPriceFrom,
    filterPriceTo,
    size,
    resetField,
  ]);

  //обробка компоненту при завантаженні сторінки з наявними URL-параметрами//
  useEffect(() => {
    const params = {};
    if (searchParams.size === 0) {
      return;
    }

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const getParsedParamsValues = params => {
      for (const [key, value] of Object.entries(params)) {
        if (key === 'size') {
          const selectedSizesArray = [];
          const selectedIndexSizesArray = value.split('_');

          for (const [key, value] of Object.entries(sizeOption)) {
            for (let i = 0; i < selectedIndexSizesArray.length; i += 1) {
              if (selectedIndexSizesArray[i] === key) {
                selectedSizesArray.push([{ name: key, value: value }]);
              }
            }
            setSelectedSizes(selectedSizesArray);
          }
        }
        if (key === 'price') {
          const selectedFilterPrice = filterPrices.find(
            (el, index) => Number(value) === index
          );

          setValue('filterPriceRadio', selectedFilterPrice);
        }
        if (key === 'brand') {
          setValue('filterBrand', value);
        }
        if (key === 'price_to') {
          setValue('filterPriceTo', value);
        }
        if (key === 'price_from') {
          setValue('filterPriceFrom', value);
        }
        if (key === 'condition') {
          let selectedConditions = [];
          const selectedIndexConditionsArray = value.split('_');
          selectedIndexConditionsArray.forEach(el => {
            selectedConditions.push(filterConditions[Number(el)]);
          });
          setValue('filterCondition', selectedConditions);
        }
      }
    };
    getParsedParamsValues(params);
  }, [searchParams, setValue]);

  //обробка скидання форми фільтрів//
  useEffect(() => {
    if (!shouldFilterProductReset) {
      return;
    }
    setSelectedSizes([]);
    setFilterData({
      size: '[]',
      brandName: '',
      condition: [],
      filterPrice: '',
      filterPriceFrom: '',
      filterPriceTo: '',
    });
    reset();
    dispatch(showFilterProduct());
    onChange(filterData);
    dispatch(unSubmitFilterForm());
  }, [
    shouldFilterProductReset,
    onChange,
    dispatch,
    filterData,
    selectedSizes,
    resetField,
    reset,
  ]);

  //обробка скидання значень інпутів(price)//
  useEffect(() => {
    if (dirtyFields.filterPriceFrom || dirtyFields.filterPriceTo) {
      resetField('filterPriceRadio', { defaultValue: '' });
    }
    return;
  }, [dirtyFields.filterPriceFrom, dirtyFields.filterPriceTo, resetField]);

  useEffect(() => {
    if (
      dirtyFields.filterPriceRadio &&
      (dirtyFields.filterPriceFrom || dirtyFields.filterPriceTo)
    ) {
      resetField('filterPriceFrom', { defaultValue: '' });
      resetField('filterPriceTo', { defaultValue: '' });
    }
  }, [
    dirtyFields.filterPriceFrom,
    dirtyFields.filterPriceTo,
    dirtyFields.filterPriceRadio,
    resetField,
  ]);

  const handleOptionsChange = type => {
    switch (type) {
      case 'Розмір':
        setShowSizes(!showSizes);
        break;
      case 'Ціна':
        setShowPrices(!showPrices);
        break;
      case 'Стан':
        setShowCondition(!showCondition);
        break;
      case 'Бренд':
        setShowBrand(!showBrand);
        break;
      default:
        break;
    }
  };

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

  const handleRadioBtnClick = value => {
    if (watchPriceRadio === value) {
      resetField('filterPriceRadio', { defaultValue: '' });
      return;
    }
  };

  const isSelected = size => {
    return selectedSizes.some(s => s[0].name === size);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const dataForUpload = {
      size: JSON.stringify(selectedSizes),
      brandName: data.filterBrand,
      condition: data.filterCondition,
      filterPrice: data.filterPriceRadio,
      filterPriceFrom: data.filterPriceFrom === '' ? '0' : data.filterPriceFrom,
      filterPriceTo: data.filterPriceTo === '' ? '1000000' : data.filterPriceTo,
    };
    await onChange(dataForUpload);
    await dispatch(submitFilterForm());
    await dispatch(hideFilterInMobile());
  };

  return (
    <section className={s.optionsWrapper}>
      {isMobile && (
        <AiOutlineClose
          size={20}
          className={s.closeIcon}
          onClick={() => {
            dispatch(hideFilterInMobile());
          }}
        />
      )}
      <h2 className={s.title}>Фільтри</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OptionsHeader title="Розмір" onChange={handleOptionsChange} />
        {showSizes && (
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
                      textClass="titleGroupItems-filter"
                    />
                  ) : (
                    <Text text={size} textClass="titleGroupItems-filter" />
                  )}
                  {values.length > 1 && (
                    <Text
                      text={`UA: ${values[1].UA}`}
                      textClass="after-title-bigger-filter"
                    />
                  )}
                  {values.length > 1 && (
                    <Text
                      text={`IN: ${values[2].IN}`}
                      textClass="after-title-bigger-filter"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <OptionsHeader title="Ціна" onChange={handleOptionsChange} />
        {showPrices && (
          <div className={s.optionMainBox}>
            <ul className={s.optionMainBox}>
              {filterPrices.map((el, index) => {
                return (
                  <li key={nanoid()} className={s.radioItem}>
                    <div className={s.radioContent}>
                      <div style={{ cursor: 'pointer' }}>
                        <input
                          {...register('filterPriceRadio')}
                          className={s.input_check}
                          type="radio"
                          value={el}
                          id={el}
                          onClick={() => handleRadioBtnClick(el)}
                        />
                        <label htmlFor={el} className={s.labelCheckBox}>
                          <div className={s.iconWrapper}>
                            <BiCheck size={22} className={s.radioIcon} />
                          </div>
                          <span>{el}</span>
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={s.filterInputBox}>
              <div
                style={{ marginBottom: !isDesktop ? '10px' : 0 }}
                className={s.inputWrap}
              >
                <label htmlFor="filterPriceFrom" className={s.filterLabel}>
                  Від
                </label>
                <input
                  {...register('filterPriceFrom', {
                    min: 0,
                  })}
                  id="filterPriceFrom"
                  className={s.inputFilter}
                  type="number"
                  placeholder="0 грн"
                  step="1"
                />
              </div>

              <div className={s.inputWrap}>
                <label htmlFor="filterPriceTo" className={s.filterLabel}>
                  До
                </label>
                <input
                  {...register('filterPriceTo', {
                    min: watchPriceFrom !== '' ? watchPriceFrom : 0,
                  })}
                  className={s.inputFilter}
                  id="filterPriceTo"
                  type="number"
                  placeholder="0 грн"
                  step="1"
                />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              {errors.filterPriceFrom?.type === 'min' && (
                <Text
                  text={'* Лише позитивні значення'}
                  textClass="errorMessageFilter"
                />
              )}
              {errors.filterPriceTo?.type === 'min' && (
                <Text
                  text={'* Не коректне значення'}
                  textClass="errorMessageFilter"
                />
              )}
            </div>
          </div>
        )}
        <OptionsHeader title="Стан" onChange={handleOptionsChange} />
        {showCondition && (
          <>
            <ul className={s.optionMainBox}>
              {filterConditions.map((el, index) => {
                return (
                  <li key={nanoid()} className={s.radioItem}>
                    <div className={s.radioContent}>
                      <div>
                        <input
                          className={s.input_check}
                          id={el}
                          type="checkbox"
                          {...register('filterCondition')}
                          value={el}
                        />
                        <label htmlFor={el} className={s.labelCheckBox}>
                          <div className={s.iconWrapper}>
                            <BiCheck size={22} className={s.radioIcon} />
                          </div>
                          <span>{el}</span>
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <OptionsHeader title="Бренд" onChange={handleOptionsChange} />
        {showBrand && (
          <div className={s.optionMainBox}>
            <label className={s.filterLabel}>
              <input
                {...register('filterBrand')}
                className={s.inputFilter}
                type="text"
                placeholder="Введіть назву"
              />
            </label>
          </div>
        )}
        <button
          className={s.btnLightFilter}
          type="submit"
          disabled={(!isDirty && selectedSizes.length < 1) || isSubmitting}
        >
          Застосувати
        </button>
      </form>
    </section>
  );
};

export default Filter;
