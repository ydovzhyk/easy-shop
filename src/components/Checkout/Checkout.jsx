import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsFromBasket } from 'redux/product/product-selectors';
import { getUser } from 'redux/auth/auth-selectors';
import { selectOrderInCheckout, getOrderMessage } from 'redux/order/order-selectors';
// import { getAllOrders, getOrderById, updateOrder } from 'redux/order/order-operations';
import { updateOrder } from 'redux/order/order-operations';
import { updateUserBasket } from 'redux/auth/auth-opetations';

import { useForm, Controller } from 'react-hook-form';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button/Button';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import s from './Checkout.module.scss';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInCheckout = useSelector(selectOrderInCheckout);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const user = useSelector(getUser);
  const message = useSelector(getOrderMessage);

  const [isMessage, setIsMessage] = useState('');
  const [deliveryService, setDeliveryService] = useState('');

  useEffect(() => {
    if (message !== 'Order added successfully') {
      setIsMessage(message)
    };
  }, [message]);

  const resetMessage = () => {
    setIsMessage('');
  };

  const { client, orderSum, sellerId, sellerName, _id, products } =
    orderInCheckout;
  // console.log(products);
  
  const productsForOrder = productsFrombasket.filter(
    product => product.owner === sellerId
  );

  const { secondName, firstName, surName, tel } = user || {};

  const {
    control,
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      delivery: '',
      secondName: secondName ? secondName : '',
      firstName: firstName ? firstName : '',
      surName: surName ? surName : '',
      tel: tel ? tel : '',
      department: '',
      city: '',
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const orderData = {
      orderId: _id,
      sellerId: sellerId,
      sellerName: sellerName,
      products: products,
      delivery: `${data.delivery.value}, ${data.city}, ${data.department}`,
      totalSum: orderSum,
      customerSecondName: data.secondName,
      customerFirstName: data.firstName,
      customerSurName: data.surName,
      customerTel: data.tel,
      customerId: client.customerId,
    };
    console.log('Відправка order', orderData);
    
    const updatedOrder = await dispatch(updateOrder(orderData));

    // const allOrders = await dispatch(getAllOrders());
    // console.log('updatedOrder', updatedOrder);

    if (updatedOrder.payload.code === 200) {
      for (const product of products) {
        await dispatch(updateUserBasket({productId: product._id}))
      }
      navigate('/profile/mypurchases');
    };
  };
  const labelName =
    deliveryService === 'УкрПошта'
      ? 'Введіть індекс(номер) відділення*'
      : 'Введіть номер відділення*';
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
            <div className={s.orderInfo}>
              <h2 className={s.title}>Оформлення замовлення</h2>
              <Text
                textClass="productHeadings"
                text={`Продавець: ${sellerName}`}
              />
              <Text
                textClass="title"
                text={`Сума замовлення: ${orderSum} грн.`}
              />
              <ul>
                {productsForOrder.map(
                  ({
                    _id,
                    nameProduct,
                    mainPhotoUrl,
                    brendName,
                    price,
                    size,
                  }) => {
                    const sizesForProduct =
                      products.find(item => item._id === _id)?.size || size;
                    const transformedSize = sizesForProduct.map(
                      item => item.name
                    );
                    const sizeQuantity = sizesForProduct.map(
                      item => item.quantity
                    );
                    const productsPrice =
                      sizeQuantity.reduce((prevValue, number) => prevValue + number, 0) * price;
                    return (
                      <li className={s.productItem} key={_id}>
                        <div className={s.infoWraper}>
                          <div className={s.mainInfo}>
                            <div className={s.thumb}>
                              <img
                                className={s.mainPhoto}
                                src={mainPhotoUrl}
                                onError={e => (e.target.src = NoPhoto)}
                                alt={nameProduct}
                              />
                            </div>
                            <div className={s.description}>
                              <Text textClass="productText" text={brendName} />
                              <Text
                                textClass="productHeadings"
                                text={nameProduct}
                              />
                              <div className={s.sizeQuantity}>
                                <div className={s.sizeQuantityWrapper}>
                                  {transformedSize.map(size => (
                                    <Text
                                      key={size}
                                      textClass="productText"
                                      text={`Size: ${size}`}
                                    />
                                  ))}
                                </div>
                                <div className={s.sizeQuantityWrapper}>
                                  {sizeQuantity.map((quantity, index) => (
                                    <Text
                                      key={index}
                                      textClass="productText"
                                      text={`Кількість: ${quantity}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={s.priceWrapper}>
                            <Text
                              textClass="productHeadings"
                              text={`Сума: ${productsPrice}`}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
              <div className={s.formField}>
                <Text textClass="title" text="Спосіб доставки" />
                <Controller
                  control={control}
                  name="delivery"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <SelectField
                      value={value}
                      handleChange={selectedValue => {
                        console.log(selectedValue);
                        onChange(selectedValue);
                        setDeliveryService(selectedValue.value);
                      }}
                      className="addOrder"
                      {...field.delivery}
                      options={['Нова пошта', 'УкрПошта', 'Meest']}
                      {...register('delivery', {
                        required: 'Виберіть службу доставки',
                      })}
                    />
                  )}
                />
                {/* {errors.delivery && (
                  <p className={s.inputError}>{errors.delivery.message}</p>
                )} */}
                <Text text={'Введіть місто*'} textClass="productHeadings" />
                <Controller
                  control={control}
                  name="city"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      className="addOrder"
                      value={value}
                      control={control}
                      handleChange={onChange}
                      {...field.city}
                      required={true}
                      {...register('city', {
                        required: "Обов'язково до заповнення",
                      })}
                    />
                  )}
                />
                <Text text={labelName} textClass="productHeadings" />
                <Controller
                  control={control}
                  name="department"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      className="addOrder"
                      value={value}
                      control={control}
                      handleChange={onChange}
                      {...field.deliveryDepartment}
                      required={true}
                      {...register('department', {
                        required: "Обов'язково до заповнення",
                      })}
                    />
                  )}
                />
              </div>
              <div>
                <Text textClass="title" text="Ваші контактні дані" />
                <div className={s.formField}>
                  <Text text={'Прізвище*'} textClass="productHeadings" />
                  <Controller
                    control={control}
                    name="secondName"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className="addOrder"
                        value={value}
                        control={control}
                        handleChange={onChange}
                        {...field.secondName}
                        required={true}
                        {...register('secondName', {
                          required: "Обов'язково до заповнення",
                        })}
                      />
                    )}
                  />
                  {/* {errors.secondName && (
                    <p className={s.inputError}>{errors.secondName.message}</p>
                  )} */}
                </div>
                <div className={s.formField}>
                  <Text text={"Ім'я*"} textClass="productHeadings" />
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className="addOrder"
                        value={value}
                        control={control}
                        handleChange={onChange}
                        {...field.firstName}
                        required={true}
                        {...register('firstName', {
                          required: "Обов'язково до заповнення",
                        })}
                      />
                    )}
                  />
                  {/* {errors.firstName && (
                    <p className={s.inputError}>{errors.firstName.message}</p>
                  )} */}
                </div>

                <div className={s.formField}>
                  <Text text={'По батькові*'} textClass="productHeadings" />
                  <Controller
                    control={control}
                    name="surName"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className="addOrder"
                        value={value}
                        control={control}
                        handleChange={onChange}
                        {...field.surName}
                        required={true}
                        {...register('surName', {
                          required: "Обов'язково до заповнення",
                        })}
                      />
                    )}
                  />
                  {/* {errors.surName && (
                    <p className={s.inputError}>{errors.surName.message}</p>
                  )} */}
                </div>

                <div className={s.formField}>
                  <Text
                    text={'Телефон +380*'}
                    textClass="productHeadings"
                    type="tel"
                  />
                  <Controller
                    control={control}
                    name="tel"
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        className="addOrder"
                        value={value}
                        control={control}
                        handleChange={onChange}
                        {...field.tel}
                        required={true}
                        {...register('tel', {
                          required: "Обов'язково до заповнення",
                          pattern: {
                            value: /^\+?3?8?[0-9]{10}/,
                            message: 'Приклад номеру : +380993453451',
                          },
                        })}
                      />
                    )}
                  />
                  {/* {errors.tel && (
                    <p className={s.inputError}>{errors.tel.message}</p>
                  )} */}
                </div>
              </div>
            </div>
            <div className={s.sumWrapper}>
              <p className={s.sumTitle}>Разом</p>

              <div className={s.sumBox}>
                <Text textClass="after-title-bigger" text="Вартість товару" />
                <span>{orderSum}</span>
              </div>
              <div className={s.sumBox}>
                <Text textClass="title" text="До оплати" />
                <Text textClass="title" text={orderSum} />
              </div>
              <Button
                type="submit"
                btnClass="btnLight"
                text="Оформити замовлення"
                handleClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
        {isMessage && (
          <MessageWindow text={`${message}`} onDismiss={resetMessage} />
        )}
      </section>
    </Container>
  );
};

export default Checkout;
