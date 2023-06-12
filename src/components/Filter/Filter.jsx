import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, Controller } from 'react-hook-form';
import sizeOption from '../AddProduct/Size/sizeTable.json';
import OptionsHeader from 'components/Shared/OptionsHeader/OptionsHeader';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import s from './Filter.module.scss';

const Filter = () => {
  const [showSizes, setShowSizes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  const handleOptionsChange = type => {
    switch (type) {
      case 'Розмір':
        setShowSizes(!showSizes);
        break;
      case 'Ціна':
        setShowPrices(!showPrices);
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
      priceFilter: 0,
      filterPriceMain: 0,
      filterPriceSecondary: 0,
    },
  });

  return (
    <div className={s.optionsWrapper}>
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
            <div className={s.radioBox}>
              <Controller
                control={control}
                name="priceFilter"
                render={({ field: { onChange, value } }) => (
                  <label className={s.labelRadio}>
                    <input
                      type="radio"
                      name="priceFilter"
                      onChange={onChange}
                      control={control}
                      value={value}
                    />
                    До 100грн
                  </label>
                )}
              />
              <Controller
                control={control}
                name="priceFilter"
                render={({ field: { onChange, value } }) => (
                  <label className={s.labelRadio}>
                    <input
                      type="radio"
                      name="priceFilter"
                      onChange={onChange}
                      control={control}
                      value={value}
                    />
                    Від 100 до 300грн
                  </label>
                )}
              />
              <Controller
                control={control}
                name="priceFilter"
                render={({ field: { onChange, value } }) => (
                  <label className={s.labelRadio}>
                    <input
                      type="radio"
                      name="priceFilter"
                      onChange={onChange}
                      control={control}
                      value={value}
                    />
                    Від 300 до 500грн
                  </label>
                )}
              />
              <Controller
                control={control}
                name="priceFilter"
                render={({ field: { onChange, value } }) => (
                  <label className={s.labelRadio}>
                    <input
                      type="radio"
                      name="priceFilter"
                      onChange={onChange}
                      control={control}
                      value={value}
                    />
                    Від 500 до 1000грн
                  </label>
                )}
              />
              <Controller
                control={control}
                name="priceFilter"
                render={({ field: { onChange, value } }) => (
                  <label className={s.labelRadio}>
                    <input
                      type="radio"
                      name="priceFilter"
                      onChange={onChange}
                      control={control}
                      value={value}
                    />
                    Більше 1000 грн
                  </label>
                )}
              />
            </div>
            <div className={s.filterInputBox}>
              <Controller
                control={control}
                name="filterPriceMain"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    control={control}
                    handleChange={onChange}
                    className="priceFilter"
                    {...field.filterPriceMain}
                  />
                )}
              />
              <Controller
                control={control}
                name="filterPriceSecondary"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    control={control}
                    handleChange={onChange}
                    className="priceFilter"
                    {...field.filterPriceMain}
                  />
                )}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Filter;
