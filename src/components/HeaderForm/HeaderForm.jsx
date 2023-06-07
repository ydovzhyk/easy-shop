import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import s from './HeaderForm.module.scss';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from 'redux/product/product-operations';

const HeaderForm = ({ onChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    console.log(data.productName);
    // navigate(`/search/${query}`)
    // setSearchParams(data.productName.trim() !== '' ? { query: data } : {});

    await dispatch(searchProducts(dataForUpload));
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
      ></Button>
    </form>
  );
};

export default HeaderForm;
