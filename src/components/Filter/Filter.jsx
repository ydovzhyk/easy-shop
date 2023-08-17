import { useState, useEffect } from 'react';
import { BiCheck } from 'react-icons/bi';

import { useMediaQuery } from 'react-responsive';

import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { getFilterProduct } from 'redux/product/product-selectors';
import {
  showFilterProduct,
  unSubmitFilterForm,
  submitFilterForm,
} from 'redux/product/product-slice';

import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import Text from 'components/Shared/Text/Text';
import { filterPrices } from './filterPrice';
import { filterConditions } from './filterСonditions';

import s from './Filter.module.scss';

const Filter = ({ onChange }) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const [filterData, setFilterData] = useState({});
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [showCondition, setShowCondition] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const shouldFilterProductReset = useSelector(getFilterProduct);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    resetField,
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
  };

  return (
    <section className={s.optionsWrapper}>
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
              {filterPrices.map(el => {
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
