import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { getProductById } from 'redux/product/product-operations';
import { clearProductById } from 'redux/product/product-slice';
import { addProduct } from 'redux/product/product-operations';
import { getMessage } from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';
import { selectProductById } from 'redux/product/product-selectors';

import { field } from 'components/Shared/TextField/fields';
import Size from '../AddProduct/Size/Size';
import Photo from '../AddProduct/Photo/Photo';
import CalendarEdit from 'components/Shared/Calendar/Calendar';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import categoryOptions from '../AddProduct/category.json';

import s from '../AddProduct/AddProduct.module.scss';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector(getID);
  const message = useSelector(getMessage);
  const product = useSelector(selectProductById);
  const [sectionValue, setSectionValue] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [mainFile, setMainFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorFormFilling, setErrorFormFilling] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isMessage, setIsMessage] = useState('');

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const [formData, setFormData] = useState({
    nameProduct: '',
    brendName: '',
    category: '',
    condition: '',
    section: '',
    quantity: 1,
    description: '',
    keyWords: '',
    price: 0,
    vip: 'Ні',
    sale: 0,
    saleDate: today,
  });

  useEffect(() => {
    dispatch(clearProductById());
    dispatch(getProductById(id));
  }, [dispatch, id]);

  //   console.log('Це оновлені дефолтні значення', product);

  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  const handleSelectedSizesChange = sizes => {
    setSelectedSizes(sizes);
  };

  const handleMainFileChange = file => {
    setMainFile(file);
  };

  const handleAdditionalFilesChange = files => {
    setAdditionalFiles(files);
  };

  const error = (mainFile, additionalFiles, selectedSizes) => {
    if (!mainFile && additionalFiles.length === 0) {
      setErrorFormFilling(true);
      setErrorMessage(
        prevErrorMessage =>
          prevErrorMessage + ' Виберіть хоча б одну фотографію'
      );
      return true;
    }
    if (selectedSizes.length === 0) {
      setErrorFormFilling(true);
      setErrorMessage(
        prevErrorMessage => prevErrorMessage + ' Виберіть хоча б один розмір'
      );
      return true;
    }
    return false;
  };

  const resetError = () => {
    setErrorFormFilling(false);
    setErrorMessage(null);
  };

  const resetMessage = () => {
    setIsMessage('');
  };

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: formData,
  });

  useEffect(() => {
    if (product && Object.keys(product).length !== 0) {
      const updatedFormData = {
        nameProduct: product.nameProduct,
        brendName: product.brendName,
        category: product.category,
        condition: product.condition,
        section: product.section,
        quantity: product.quantity,
        description: product.description,
        keyWords: product.keyWords,
        price: product.price,
        vip: product.vip,
        size: product.size,
        additionalPhotoUrl: product.additionalPhotoUrl,
        mainPhotoUrl: product.mainPhotoUrl,
        owner: product.owner,
        status: product.status,
        _id: product._id,
        date: product.date,
        sale: product.sale ? product.sale : 0,
        saleDate: product.saleDate ? product.saleDate : today,
      };
      setFormData(updatedFormData);
      reset(updatedFormData);
    }
  }, [product, reset, today]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const errorFilling = await error(mainFile, additionalFiles, selectedSizes);
    if (!errorFilling) {
      const dataForUpload = new FormData();
      dataForUpload.append('nameProduct', data.nameProduct);
      dataForUpload.append('brendName', data.brendName);
      dataForUpload.append('condition', data.condition.value);
      dataForUpload.append('section', data.section.value);
      dataForUpload.append('category', data.category.value);
      dataForUpload.append('vip', data.vip.value);
      dataForUpload.append('quantity', data.quantity);
      dataForUpload.append('description', data.description);
      dataForUpload.append('keyWords', data.keyWords);
      dataForUpload.append('price', data.price);
      dataForUpload.append('size', JSON.stringify(selectedSizes));
      dataForUpload.append('mainFileName', mainFile.name);
      const allFiles = [...additionalFiles, mainFile];
      allFiles.forEach(file => {
        dataForUpload.append('files', file);
      });
      dataForUpload.append('owner', userId);
      dataForUpload.append('date', today);

      await dispatch(addProduct(dataForUpload));
      await setIsFormSubmitted(true);
      await setMainFile('');
      await setAdditionalFiles([]);
      await setSelectedSizes([]);
      await setErrorMessage('');
      await setErrorFormFilling(false);
      reset();
    }
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
                    defaultValue={formData.condition}
                    placeholder={formData.condition}
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
                    name="brendName"
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
              <Controller
                control={control}
                name="section"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={selectedValue => {
                      onChange(selectedValue);
                      setSectionValue(selectedValue);
                    }}
                    className="addProduct"
                    name="section"
                    {...field.section}
                    defaultValue={formData.section}
                    placeholder={formData.section}
                    required={true}
                    options={[
                      'Жінкам',
                      'Чоловікам',
                      'Дитячі товари',
                      "Краса та здоров'я",
                    ]}
                  />
                )}
              />
            </div>
            <div className={s.partBlock}>
              <Text text={'Виберіть категорію'} textClass="title" />
              <Controller
                control={control}
                name="category"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => {
                  const options =
                    typeof sectionValue === 'object' && sectionValue?.value
                      ? categoryOptions[sectionValue.value] || []
                      : [];
                  return (
                    <SelectField
                      value={value}
                      handleChange={onChange}
                      className="addProduct"
                      name="category"
                      {...field.category}
                      defaultValue={formData.category}
                      placeholder={formData.category}
                      required={true}
                      options={options}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className={s.blockOne}>
            <div className={s.partBlock}>
              <Text text={'Наявність'} textClass="title" />
              <div className={s.partBoxOneGroup}>
                <Text text={'Кількість*'} textClass="after-title" />
                <div className={s.partBoxOneAfter}>
                  <Controller
                    control={control}
                    name="quantity"
                    rules={{
                      required: true,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        value={value}
                        control={control}
                        name="quantity"
                        handleChange={onChange}
                        className="addProduct"
                        {...field.quantity}
                      />
                    )}
                  />
                  <Text text={'шт.'} textClass="after-title-before" />
                </div>
              </div>
            </div>
            <div className={s.partBlock}>
              <Text text={'Умови продажу'} textClass="title" />
              <div className={s.partBoxOneGroup}>
                <Text text={'Ціна*'} textClass="after-title" />
                <div className={s.partBoxOneAfter}>
                  <Controller
                    control={control}
                    name="price"
                    rules={{
                      required: true,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        value={value}
                        control={control}
                        name="price"
                        handleChange={onChange}
                        className="addProduct"
                        {...field.price}
                      />
                    )}
                  />
                  <Text text={'грн.'} textClass="after-title-before" />
                </div>
              </div>
            </div>
          </div>
          <div className={s.blockOne}>
            <div className={s.partBlock}>
              <Text text={'Умови акції'} textClass="title" />
              <div className={s.partBoxOneGroup}>
                <Text text={'Відсоток знижки*'} textClass="after-title" />
                <div className={s.partBoxOneAfter}>
                  <Controller
                    control={control}
                    name="sale"
                    rules={{
                      required: false,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        value={value}
                        control={control}
                        name="sale"
                        handleChange={onChange}
                        className="addProduct"
                        {...field.sale}
                      />
                    )}
                  />
                  <Text text={'%.'} textClass="after-title-before" />
                </div>
              </div>
            </div>
            <div className={s.partBlock}>
              <Text text={'Дата початку акції'} textClass="title" />
              <div className={s.partBoxOneGroup}>
                <Text text={'Оберіть дату*'} textClass="after-title" />
                <div className={s.partBoxOneAfter}>
                  <Controller
                    control={control}
                    name="saleDate"
                    rules={{
                      required: false,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <CalendarEdit
                        value={value}
                        control={control}
                        name="saleDate"
                        handleChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <Text text={'Виберіть розмір'} textClass="title" />
          <Text
            text={'Можна вибрати декілька варіантів*'}
            textClass="after-title"
          />
          <Size
            onSelectedSizesChange={handleSelectedSizesChange}
            isFormSubmitted={isFormSubmitted}
            historySize={formData.size}
          />
          <Text text={'Завантажте фотографії'} textClass="title" />
          <Photo
            register={register}
            onChangeMainFile={handleMainFileChange}
            onChangeAdditionalFiles={handleAdditionalFilesChange}
            isFormSubmitted={isFormSubmitted}
            mainPhotoUrl={formData.mainPhotoUrl}
            additionalPhotoUrl={formData.additionalPhotoUrl}
          />
          <Text text={'Ключові слова'} textClass="title" />
          <Controller
            control={control}
            name="keyWords"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <textarea
                className={s.textarea}
                value={value}
                onChange={onChange}
                {...field.keyWords}
                rows={1}
                cols={240}
              />
            )}
          />
          <Text text={'VIP статус оголошення'} textClass="title" />
          <Controller
            control={control}
            name="vip"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SelectField
                value={value}
                handleChange={onChange}
                className="vip"
                name="vip"
                {...field.condition}
                defaultValue={formData.vip}
                placeholder={formData.vip}
                required={true}
                options={['Так', 'Ні']}
              />
            )}
          />
          <div className={s.wrap}>
            <Button text="Додати" btnClass="btnLight" />
          </div>
        </form>
        {errorFormFilling && (
          <ErrorMessage text={`${errorMessage}`} onDismiss={resetError} />
        )}
        {isMessage && (
          <MessageWindow text={`${message}`} onDismiss={resetMessage} />
        )}
      </section>
    </Container>
  );
};

export default EditProduct;
