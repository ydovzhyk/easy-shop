import { useSelector, useDispatch } from 'react-redux';
import { getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';

import { field } from 'components/Shared/TextField/fields';
import { addProduct } from 'redux/product/product-operations';

import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

import s from './AddProduct.module.scss';

const AddProduct = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getID);

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      productName: '',
      brendName: '',
      category: '',
      condition: '',
      shopName: '',
      description: '',
      price: '',
      files: [],
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const dataForUpload = new FormData();
    dataForUpload.append('nameProduct', data.nameProduct);
    dataForUpload.append('brendName', data.brendName);
    dataForUpload.append('condition', data.condition.value);
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
    <Container>
      <section className={s.section}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Text text={'Опишіть вашу річ'} textClass="title" />
          <Text text={'Назва*'} textClass="after-title" />
          <Controller
            control={control}
            name="nameProduct"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                className="addProduct"
                value={value}
                control={control}
                handleChange={onChange}
                {...field.nameProduct}
              />
            )}
          />
          <Text text={'Опис товару*'} textClass="after-title" />
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
                rows={3}
                cols={40}
              />
            )}
          />
          <div className={s.blockOne}>
            <div className={s.partBlock}>
              <Text text={'Стан*'} textClass="after-title" />
              <Controller
                control={control}
                name="condition"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={onChange}
                    className="addProduct"
                    name="condition"
                    {...field.condition}
                    required={true}
                    options={[
                      'Новий',
                      'Ідеальний',
                      'Дуже хороший',
                      'Хороший',
                      'Задовільний',
                    ]}
                  />
                )}
              />
            </div>
            <div className={s.partBlock}>
              <Text text={'Бренд*'} textClass="after-title" />
              <Controller
                control={control}
                name="brendName"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="addProduct"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.brendName}
                  />
                )}
              />
            </div>
          </div>
          <div className={s.blockOne}>
            <div className={s.partBlock}>
              <Text text={'Виберіть розділ'} textClass="title" />
            </div>
            <div className={s.partBlock}>
              <Text text={'Виберіть категорію'} textClass="title" />
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
            </div>
          </div>

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
      </section>
    </Container>
  );
};

export default AddProduct;
