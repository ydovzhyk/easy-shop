import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsFromBasket } from 'redux/product/product-selectors';
import { getUser } from 'redux/auth/auth-selectors';
import { selectOrderInCheckout, getOrderMessage } from 'redux/order/order-selectors';
import { updateOrder } from 'redux/order/order-operations';
import { updateUserBasket } from 'redux/auth/auth-opetations';
import { getProductsFromBasket } from 'redux/product/product-operations';

import { useForm, Controller } from 'react-hook-form';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button/Button';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import s from './Checkout.module.scss';
import OrderProductList from './OrderProductsList';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInCheckout = useSelector(selectOrderInCheckout);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const user = useSelector(getUser);
  const message = useSelector(getOrderMessage);
  
  useEffect(() => {
    dispatch(getProductsFromBasket(user._id));
  }, [dispatch, user]); 

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
  const orderNumber = _id.match(/\d+/g).join('').slice(0, 7);
  
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
      orderNumber: orderNumber,
    };
    console.log('Відправка order', orderData);
    
    const updatedOrder = await dispatch(updateOrder(orderData));

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
              <h2 className={s.title}>
                Оформлення замовлення &#8470; {orderNumber}
              </h2>
              <Text
                textClass="productHeadings"
                text={`Продавець: ${sellerName}`}
              />
              <Text
                textClass="title"
                text={`Сума замовлення: ${orderSum} грн.`}
              />
              <OrderProductList
                productsForOrder={productsForOrder}
                products={products}
              />
              
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
                text="Оформити"
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
