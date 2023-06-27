import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams, useLocation } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import s from './HeaderForm.module.scss';

const HeaderForm = () => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUserAt404Page =
    !pathname.includes('/products') || !pathname.includes('/products/');

  const {
    control,
    handleSubmit,
    //     formState: { errors },
  } = useForm({
    defaultValues: {
      productName: JSON.parse(window.localStorage.getItem('searchQuery')) ?? '',
    },
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    // setQuery(data.productName);
    window.localStorage.setItem(
      'searchQuery',
      JSON.stringify(data.productName)
    );
    await setSearchParams(
      data.productName.trim() !== '' ? { search: data.productName } : {}
    );
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

      <Button
        type="submit"
        btnClass="searchBtn"
        text={<CiSearch size={30} />}
        handleClick={() =>
          navigate(
            pathname === '/'
              ? '/products'
              : isUserAt404Page
              ? '/products'
              : pathname
          )
        }
      ></Button>
    </form>
  );
};

export default HeaderForm;
