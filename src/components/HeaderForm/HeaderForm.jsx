import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import s from './HeaderForm.module.scss';
import React from 'react';

const HeaderForm = () => {
  // const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      productName: '',
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const dataForUpload = {
      data: {
        productName: data.productName,
      },
    };
    console.log(data);

    // await dispatch(searchProduct(dataForUpload));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="productName"
        render={({ field: { value, onChange } }) => (
          <TextField
            className="headerForm"
            value={value}
            handleChange={onChange}
            {...field.productName}
          />
        )}
      />
      <Button
        type="submit"
        btnClass="searchBtn"
        text={<CiSearch size={30} />}
      ></Button>
    </form>
  );
};

export default HeaderForm;
