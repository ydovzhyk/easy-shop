import { useForm, Controller } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import s from './HeaderForm.module.scss';

const HeaderForm = () => {
  // const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      category: '',
      shopName: '',
      description: '',
      price: '',
      files: [],
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const dataForUpload = {
      data: {
        category: data.category.value,
        shopName: data.shopName,
        description: data.description,
        price: data.price,
      },
      files: new FormData(),
    };

    Array.from(data.files).forEach(file => {
      dataForUpload.files.append('files', file);
    });

    // await dispatch(addProduct(dataForUpload));
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="productName"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            control={control}
            handleChange={onChange}
            className="headerForm"
            {...field.productName}
          />
        )}
      />
      <Button
        type="button"
        btnClass="searchBtn"
        text={<CiSearch size={30} />}
      ></Button>
    </form>
  );
};

export default HeaderForm;
