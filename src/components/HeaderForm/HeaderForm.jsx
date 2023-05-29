import { useForm, Controller } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';
import Button from 'components/Shared/Button';
import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
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
        name="category"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <SelectField
            value={value}
            handleChange={onChange}
            name="category"
            {...field.category}
            required={true}
            classLabel="headerLabel"
            classSelect="headerSelect"
            options={['Жінкам', 'Чоловікам', 'Дитячі речі']}
          />
        )}
      />
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
            classLabel="headerLabel"
            classInput="headerInput"
            classSpan="headerSpan"
            {...field.productName}
          />
        )}
      />
      <Button
        type="button"
        btnClass="searchFormBtn"
        text={<BiSearchAlt size={30} />}
      ></Button>
    </form>
  );
};

export default HeaderForm;
