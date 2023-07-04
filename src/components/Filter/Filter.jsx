import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { BiCheck } from 'react-icons/bi';

import { nanoid } from '@reduxjs/toolkit';

import { getFilterProduct } from 'redux/product/product-selectors';
import { showFilterProduct } from 'redux/product/product-slice';

import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import { Checkbox } from './Checkbox';
import { filterPrices } from './filterPrice';
import { filterConditions } from './filterСonditions';

import s from './Filter.module.scss';

const Filter = () => {
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [showCondition, setShowCondition] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const shouldFilterProductReset = useSelector(getFilterProduct);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    register,
    resetField,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      filterPriceRadio: '',
      filterPriceFrom: '',
      filterPriceTo: '',
      filterBrand: '',
    },
  });

  useEffect(() => {
    if (shouldFilterProductReset) {
      setSelectedSizes([]);
      dispatch(showFilterProduct());
    }
  }, [shouldFilterProductReset, dispatch]);

  useEffect(() => {
    if (dirtyFields.filterPriceFrom || dirtyFields.filterPriceTo) {
      resetField('filterPriceRadio', { defaultValue: '' });
    }
  }, [dirtyFields.filterPriceFrom, dirtyFields.filterPriceTo, resetField]);

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
    const dataForUpload = new FormData();
    // dataForUpload.append('nameProduct', data.nameProduct);
    // dataForUpload.append('brendName', data.brendName);
    // dataForUpload.append('condition', data.condition.value);
    // dataForUpload.append('section', data.section.value);
    // dataForUpload.append('category', data.category.value);
    // dataForUpload.append('price', data.price);
    dataForUpload.append('size', JSON.stringify(selectedSizes));
    // dataForUpload.append('owner', userId);
    // dataForUpload.append('date', today);
    // dataForUpload.forEach((value, name) => {
    //   console.log(name, value);
    // });

    // await dispatch(addProduct(dataForUpload));
    // setSelectedSizes([]);
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
              <div className={s.inputWrap}>
                <label className={s.filterLabel}>
                  <input
                    {...register('filterPriceFrom')}
                    className={s.inputFilter}
                    type="number"
                    placeholder="Від"
                    min="0"
                    step="1"
                  />
                </label>
              </div>

              <div className={s.inputWrap}>
                <label className={s.filterLabel}>
                  <input
                    {...register('filterPriceTo')}
                    className={s.inputFilter}
                    type="number"
                    placeholder="До"
                    min="0"
                    step="1"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
        <OptionsHeader title="Стан" onChange={handleOptionsChange} />
        {showCondition && (
          <>
            <ul className={s.optionMainBox}>
              {filterConditions.map(el => {
                return (
                  <li key={nanoid()} className={s.radioItem}>
                    <div className={s.radioContent}>
                      <Controller
                        name={el}
                        control={control}
                        render={({ field }) => (
                          <Checkbox {...field} value={el} label={el} />
                        )}
                      />
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
        <Button text="Застосувати" btnClass="btnLightFilter" />
      </form>
    </section>
  );
};

export default Filter;
