import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { getProductById } from 'redux/product/product-operations';
import { clearProductById } from 'redux/product/product-slice';
import { updateProduct } from 'redux/product/product-operations';
import { getMessage } from 'redux/product/product-selectors';
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

  const goBack = () => {
    window.history.back();
  };

  const date = new Date();
  const today = moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');

  const defaultValue = {
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
  };
  const [formData, setFormData] = useState(defaultValue);

  useEffect(() => {
    dispatch(clearProductById());
    dispatch(getProductById(id));
  }, [dispatch, id]);

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

  const error = (
    mainFile,
    additionalFiles,
    selectedSizes,
    productMainPhotoUrl,
    productAdditionalPhotoUrl
  ) => {
    if (
      !mainFile &&
      additionalFiles.length === 0 &&
      !productMainPhotoUrl &&
      productAdditionalPhotoUrl.length === 0
    ) {
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
      setSelectedSizes(product.size);
      reset(updatedFormData);
    }
  }, [product, reset, today]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const productAdditionalPhotoUrl = formData.additionalPhotoUrl;
    const productMainPhotoUrl = formData.mainPhotoUrl;

    const errorFilling = await error(
      mainFile,
      additionalFiles,
      selectedSizes,
      productMainPhotoUrl,
      productAdditionalPhotoUrl
    );
    if (!errorFilling) {
      const dataForUpload = new FormData();
      dataForUpload.append('nameProduct', data.nameProduct);
      dataForUpload.append('brendName', data.brendName);
      dataForUpload.append(
        'condition',
        data.condition.value ? data.condition.value : data.condition
      );
      dataForUpload.append(
        'section',
        data.section.value ? data.section.value : data.section
      );
      dataForUpload.append(
        'category',
        data.category.value ? data.category.value : data.category
      );
      dataForUpload.append('vip', data.vip.value ? data.vip.value : data.vip);
      dataForUpload.append('quantity', data.quantity);
      dataForUpload.append('description', data.description);
      dataForUpload.append('keyWords', data.keyWords);
      dataForUpload.append('price', data.price);
      dataForUpload.append('id', formData._id);
      dataForUpload.append('sale', data.sale);
      dataForUpload.append('saleDate', data.saleDate);

      dataForUpload.append('size', JSON.stringify(selectedSizes));

      if (mainFile && additionalFiles.length > 0) {
        dataForUpload.append('mainFileName', mainFile.name);
        const allFiles = [...additionalFiles, mainFile];
        allFiles.forEach(file => {
          dataForUpload.append('files', file);
        });
      } else if (additionalFiles.length > 0) {
        dataForUpload.append('mainPhotoUrl', productMainPhotoUrl);
        const allFiles = [...additionalFiles];
        allFiles.forEach(file => {
          dataForUpload.append('files', file);
        });
      } else if (mainFile && additionalFiles.length === 0) {
        dataForUpload.append('mainFileName', mainFile.name);
        const allFiles = [mainFile];
        allFiles.forEach(file => {
          dataForUpload.append('files', file);
        });
        dataForUpload.append(
          'additionalPhotoUrl',
          JSON.stringify(productAdditionalPhotoUrl)
        );
      } else {
        dataForUpload.append('mainPhotoUrl', productMainPhotoUrl);
        dataForUpload.append(
          'additionalPhotoUrl',
          JSON.stringify(productAdditionalPhotoUrl)
        );
      }

      await dispatch(updateProduct(dataForUpload)).then(() => {
        setTimeout(() => {
          setIsFormSubmitted(true);
          setMainFile('');
          setAdditionalFiles([]);
          setSelectedSizes([]);
          setErrorMessage('');
          setErrorFormFilling(false);
          goBack();
        }, 6000);
      });
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
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={onChange}
                    className="addProduct"
                    name="condition"
                    options={[
                      'Новий',
                      'Ідеальний',
                      'Дуже хороший',
                      'Хороший',
                      'Задовільний',
                    ]}
                    defaultValue={{
                      value: formData.condition,
                      label: formData.condition,
                    }}
                    placeholder={formData.condition}
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
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={selectedValue => {
                      onChange(selectedValue);
                      setSectionValue(selectedValue);
                    }}
                    className="addProduct"
                    name="section"
                    options={[
                      'Жінкам',
                      'Чоловікам',
                      'Дитячі товари',
                      "Краса та здоров'я",
                    ]}
                    defaultValue={{
                      value: formData.section,
                      label: formData.section,
                    }}
                    placeholder={formData.section}
                  />
                )}
              />
            </div>
            <div className={s.partBlock}>
              <Text text={'Виберіть категорію'} textClass="title" />
              <Controller
                control={control}
                name="category"
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
                      options={options}
                      defaultValue={{
                        value: formData.category,
                        label: formData.category,
                      }}
                      placeholder={formData.category}
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
            render={({ field: { onChange, value } }) => (
              <SelectField
                value={value}
                handleChange={onChange}
                className="vip"
                name="vip"
                options={['Так', 'Ні']}
                defaultValue={{
                  value: formData.vip,
                  label: formData.vip,
                }}
                placeholder={formData.vip}
              />
            )}
          />
          <div className={s.wrap}>
            <Button text="Оновити" btnClass="btnLight" />
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
