import { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';

import {
  resetHeaderForm,
  notResetHeaderForm,
  clearHeaderFormErrors,
  setCurrentProductsPage,
  setHeaderFormErrors,
  clearSearchProducts,
  setHeaderFormClick,
  resetHeaderFormClick,
} from 'redux/product/product-slice';
import { getHeaderFormReset } from 'redux/product/product-selectors';

import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import Text from 'components/Shared/Text/Text';

import s from './HeaderForm.module.scss';

const HeaderForm = () => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const shouldHeaderFormReset = useSelector(getHeaderFormReset);
  const dispatch = useDispatch();

  const isUserAtProductsSearchPage = pathname.includes('/products');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      productName:
        JSON.parse(window.sessionStorage.getItem('searchQuery')) ?? '',
    },
  });

  useEffect(() => {
    if (!shouldHeaderFormReset) {
      return;
    }
    const resetForm = async () => {
      await reset();
      await window.sessionStorage.removeItem('searchQuery');
      await dispatch(notResetHeaderForm());
      await dispatch(resetHeaderFormClick());
      await dispatch(clearSearchProducts());
      await dispatch(setCurrentProductsPage(1));
    };
    resetForm();
  }, [shouldHeaderFormReset, reset, dispatch]);

  useEffect(() => {
    if (isUserAtProductsSearchPage) {
      return;
    }
    dispatch(resetHeaderForm());
  }, [isUserAtProductsSearchPage, reset, dispatch]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await window.sessionStorage.setItem(
      'searchQuery',
      JSON.stringify(data.productName)
    );
    await setSearchParams({ search: data.productName });
    await dispatch(clearHeaderFormErrors());
  };

  const handleClick = async () => {
    if (!isDirty) {
      await dispatch(setHeaderFormErrors());
    }
    if (isDirty) {
      await dispatch(clearHeaderFormErrors());
    }
    await dispatch(setCurrentProductsPage(1));
    await dispatch(setHeaderFormClick());
    await navigate(!isUserAtProductsSearchPage ? '/products' : pathname);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="productName"
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <TextField
            className="headerForm"
            value={value}
            handleChange={onChange}
            {...field.productName}
          />
        )}
      />
      {errors.productName && (
        <Text
          text={'* Введіть значення для пошуку'}
          textClass="errorMessageHeaderForm"
        />
      )}

      <Button
        type="submit"
        btnClass="searchBtn"
        text={<CiSearch size={30} />}
        handleClick={handleClick}
      ></Button>
    </form>
  );
};

export default HeaderForm;
