import { useSelector, useDispatch } from 'react-redux';
import { getLogin, getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';

import { field } from 'components/Shared/TextField/fields';
import SiteStatistic from 'components/SiteStatistic/SiteStatistic';
import { addProduct } from 'redux/product/product-operations';

import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

import s from './Default.module.scss';

const Default = () => {
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

    const dataForUpload = {
      data: {
        category: data.category.value,
        shopName: data.shopName,
        description: data.description,
        price: data.price,
        userId: userId,
        date: today,
      },
      files: new FormData(),
    };

    Array.from(data.files).forEach(file => {
      dataForUpload.files.append('files', file);
    });

    await dispatch(addProduct(dataForUpload));
    reset();
  };

  // const onSubmit = async (data, e) => {
  //   e.preventDefault();
  // const formData = new FormData();
  // Array.from(data.files).forEach(file => {
  //   formData.append('files', file);
  // });
  // formData.append('category', data.category.value);
  // formData.append('shopName', data.shopName);
  // formData.append('description', data.description);
  // formData.append('price', data.price);
  // formData.append('userId', userId);
  // formData.append('date', today);
  //   const formData = { date: today };

  //   await dispatch(addProduct(formData));
  //   reset();
  // };

  return (
    <section className={s.default}>
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <h2 className={s.title}>Перш ніж почати зареєструйтеся!</h2>
        </div>
      )}
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
                  options={['Ресторани', 'Супермаркети', "Здоров'я та краса"]}
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
      {isUserLogin && <SiteStatistic />}
    </section>
  );
};

export default Default;
