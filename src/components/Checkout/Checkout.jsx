// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductsFromBasket } from 'redux/product/product-selectors';
import { getUser } from 'redux/auth/auth-selectors';
import { selectOrderInCheckout } from 'redux/order/order-selectors';
// import { getAllOrders, getOrderById, updateOrder } from 'redux/order/order-operations';
import { updateOrder } from 'redux/order/order-operations';

import { useForm, Controller } from 'react-hook-form';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button/Button';
import s from './Checkout.module.scss';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInCheckout = useSelector(selectOrderInCheckout);
  const productsFrombasket = useSelector(selectProductsFromBasket);

  // console.log(orderInCheckout);

  const { client, orderSum, sellerId, sellerName, _id, products } =
    orderInCheckout;
  
  const productsForOrder = productsFrombasket.filter(
    product => product.owner === sellerId
  );
// console.log(productsForOrder);
  // useEffect(() => {
  //   dispatch(getOrderById(orderInChecout));
  // }, [dispatch, orderInChecout]);
  // const preOrder = dispatch(getOrderById(orderInChecout));
  // console.log(preOrder);
  const user = useSelector(getUser);

  const { secondName, firstName, surName, tel } = user || {};

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // sellerName: sellerName ? sellerName : '',
      // products: productsInOrder ? productsInOrder : [],
      delivery: '',
      // orderSum: orderSum ? orderSum : null,
      secondName: secondName ? secondName : '',
      firstName: firstName ? firstName : '',
      surName: surName ? surName : '',
      tel: tel ? tel : '',
    },
  });
  // console.log('errors', errors);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const orderData = {
      orderId: _id,
      sellerId: sellerId,
      sellerName: sellerName,
      products: products,
      delivery: data.delivery.value,
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
    // console.log('updatedOrder', updatedOrder.payload.code === 200);
    if (updatedOrder.payload.code === 200) {
      navigate('/profile/mypurchases');
    };
  };
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
                  ({ _id, nameProduct, mainPhotoUrl, brendName, price }) => (
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
                            <Text textClass="productText" text="Size" />
                          </div>
                        </div>
                        <div className={s.priceWrapper}>
                          <Text textClass="productText" text="Кількість: 1" />
                          <Text
                            textClass="productHeadings"
                            text={`Сума: ${price}`}
                          />
                        </div>
                      </div>
                    </li>
                  )
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
                      handleChange={onChange}
                      className="addOrder"
                      {...field.delivery}
                      options={['Нова пошта', 'УкрПошта', 'Meest']}
                      {...register('delivery', {
                        required: 'Виберіть службу доставки',
                      })}
                    />
                  )}
                />
                {errors.delivery && (
                  <p className={s.inputError}>{errors.delivery.message}</p>
                )}
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
                  {errors.secondName && (
                    <p className={s.inputError}>{errors.secondName.message}</p>
                  )}
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
                  {errors.firstName && (
                    <p className={s.inputError}>{errors.firstName.message}</p>
                  )}
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
                  {errors.surName && (
                    <p className={s.inputError}>{errors.surName.message}</p>
                  )}
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
                  {errors.tel && (
                    <p className={s.inputError}>{errors.tel.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={s.sumWrapper}>
              <p className={s.sumTitle}>Разом</p>

              <div className={s.sumBox}>
                <Text textClass="title" text="Вартість товару" />
                <span>{orderSum}</span>
              </div>
              <div className={s.sumBox}>
                <Text textClass="title" text="До оплати" />
                <span>{orderSum}</span>
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
      </section>
    </Container>
  );
};

export default Checkout;
