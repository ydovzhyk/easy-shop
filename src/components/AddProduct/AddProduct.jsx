import { useSelector, useDispatch } from 'react-redux';
import { getLogin, getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';

import { field } from 'components/Shared/TextField/fields';
import { addProduct } from 'redux/product/product-operations';

import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

import s from './AddProduct.module.scss';

const AddProduct = () => {
  const dispatch = useDispatch();
  const isUserLogin = useSelector(getLogin);
  const userId = useSelector(getID);

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const { control, register, handleSubmit, reset } = useForm({
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
    const dataForUpload = new FormData();
    dataForUpload.append('category', data.category.value);
    dataForUpload.append('shopName', data.shopName);
    dataForUpload.append('description', data.description);
    dataForUpload.append('price', data.price);
    dataForUpload.append('userId', userId);
    dataForUpload.append('date', today);

    Array.from(data.files).forEach(file => {
      dataForUpload.append('files', file);
    });
    dispatch(addProduct(dataForUpload));
    reset();
  };

  return (
    <section className={s.default}>
      {isUserLogin && (
        <div className={s.defaultBoxForm}>
          <h2 className={s.title}>Додайте картку товару!</h2>
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
                  options={['Жінкам', 'Чоловікам', 'Дитячі речі']}
                />
              )}
            />
            <Controller
              control={control}
              name="shopName"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  control={control}
                  handleChange={onChange}
                  {...field.shopName}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{
                required: true,
                pattern: /^[0-9]+$/,
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  control={control}
                  handleChange={field.onChange}
                  name="price"
                  placeholder="Ціна за одиницю*"
                  required={true}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <textarea
                  className={s.textarea}
                  value={value}
                  onChange={onChange}
                  {...field.description}
                  rows={4}
                  cols={40}
                />
              )}
            />
            <div className={s.imgForm}>
              <FormInputFile
                name="files"
                accept="image/png, image/jpeg"
                register={register}
              />
            </div>
            <div className={s.wrap}>
              <Button text="Додати" btnClass="btnLight" />
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default AddProduct;
