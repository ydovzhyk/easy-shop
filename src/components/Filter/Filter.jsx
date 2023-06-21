import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, Controller } from 'react-hook-form';
import { BiCheck } from 'react-icons/bi';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import Text from 'components/Shared/Text/Text';
import s from './Filter.module.scss';
import { filterPrices } from './filterPrice';
import { filterConditions } from './filterСonditions';

const Filter = () => {
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [showCondition, setShowCondition] = useState(true);
  const [showBrand, setShowBrand] = useState(true);

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

  const {
    control,
    // register, handleSubmit, reset
  } = useForm({
    defaultValues: {
      priceFilter: '',
      filterPriceMain: 0,
      filterPriceSecondary: 0,
      conditionFilter: '',
    },
  });

  return (
    <section className={s.optionsWrapper}>
      <h2 className={s.title}>Фільтри</h2>
      <form>
        <OptionsHeader title="Розмір" onChange={handleOptionsChange} />
        {showSizes && (
          <ul className={s.sizeGroupList}>
            {Object.entries(sizeOption).map(([size, values]) => {
              return (
                <li key={nanoid()} className={s.sizeGroupItem}>
                  {values.length > 1 ? (
                    <Text
                      text={`EU: ${values[0].EU}`}
                      textClass="sizeGroupMainTextContent"
                    />
                  ) : (
                    <Text text={size} textClass="sizeGroupMainTextContent" />
                  )}
                  {values.length > 1 && (
                    <Text
                      text={`UA: ${values[1].UA}`}
                      textClass="sizeGroupTextContent"
                    />
                  )}
                  {values.length > 1 && (
                    <Text
                      text={`IN: ${values[2].IN}`}
                      textClass="sizeGroupTextContent"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <OptionsHeader title="Ціна" onChange={handleOptionsChange} />
        {showPrices && (
          <>
            <ul className={s.radioList}>
              {filterPrices.map(el => {
                return (
                  <li key={nanoid()} className={s.radioItem}>
                    <Controller
                      control={control}
                      name="priceFilter"
                      render={({ field: { onChange, value } }) => (
                        <div className={s.radioContent}>
                          <input
                            className={s.radioInput}
                            type="radio"
                            name="priceFilter"
                            onChange={onChange}
                            control={control}
                            value={value}
                            id="input-radio"
                          />
                          <label htmlFor="input-radio" className={s.labelRadio}>
                            <BiCheck
                              size={22}
                              style={{
                                border: '1px solid var(--btn-border-color)',
                              }}
                              className={s.radioIcon}
                            />
                            <span>{el}</span>
                          </label>
                        </div>
                      )}
                    />
                  </li>
                );
              })}
            </ul>
            <div className={s.filterInputBox}>
              <Controller
                control={control}
                name="filterPriceMain"
                render={({ field: { onChange, value } }) => (
                  <label className={s.filterLabel}>
                    <input
                      onChange={onChange}
                      className={s.inputFilter}
                      control={control}
                      // value={value}
                      type="number"
                      name="filterPriceMain"
                      placeholder="Від"
                      min="0"
                      step="1"
                    />
                  </label>
                )}
              />
              <Controller
                control={control}
                name="filterPriceSecondary"
                render={({ field: { onChange, value } }) => (
                  <label className={s.filterLabel}>
                    <input
                      onChange={onChange}
                      className={s.inputFilter}
                      control={control}
                      // value={value}
                      type="number"
                      name="filterPriceSecondary"
                      placeholder="До"
                      min="0"
                      step="1"
                    />
                  </label>
                )}
              />
            </div>
          </>
        )}
        <OptionsHeader title="Стан" onChange={handleOptionsChange} />
        {showCondition && (
          <>
            <ul className={s.radioList}>
              {filterConditions.map(el => {
                return (
                  <li key={nanoid()} className={s.radioItem}>
                    <Controller
                      control={control}
                      name="conditionFilter"
                      render={({ field: { onChange, value } }) => (
                        <div className={s.radioContent}>
                          <input
                            className={s.radioInput}
                            type="radio"
                            name="conditionFilter"
                            onChange={onChange}
                            control={control}
                            value={value}
                            id="input-radio"
                          />
                          <label htmlFor="input-radio" className={s.labelRadio}>
                            <BiCheck
                              size={22}
                              style={{
                                border: '1px solid var(--btn-border-color)',
                              }}
                              className={s.radioIcon}
                            />
                            <span>{el}</span>
                          </label>
                        </div>
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <OptionsHeader title="Бренд" onChange={handleOptionsChange} />
        {showBrand && (
          <>
            <Controller
              control={control}
              name="filterBrand"
              render={({ field: { onChange, value } }) => (
                <label className={s.filterLabel}>
                  <input
                    onChange={onChange}
                    className={s.inputFilter}
                    control={control}
                    // value={value}
                    type="text"
                    name="filterBrand"
                    placeholder="Enter brand name"
                    minLength={2}
                  />
                </label>
              )}
            />
          </>
        )}
      </form>
    </section>
  );
};

export default Filter;
