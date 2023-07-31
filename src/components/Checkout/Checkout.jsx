import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingOrders, selectOrderById, selectProductsOrderById } from 'redux/order/order-selectors';
import { getOrderById, updateOrder } from 'redux/order/order-operations';

import { useForm, Controller } from 'react-hook-form';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import { field } from 'components/Shared/TextField/fields';
import SelectField from 'components/Shared/SelectField/SelectField';
import Button from 'components/Shared/Button/Button';
import OrderProductsList from 'components/Shared/OrderProductsList/OrderProductsList';
import FormField from './FormField';
import s from './Checkout.module.scss';


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId ?? null;

  useEffect(() => {
    if (!orderId) {
      return
    }
    dispatch(getOrderById(orderId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, orderId]);

  const orderInCheckout = useSelector(selectOrderById);
  const productsForOrder = useSelector(selectProductsOrderById);
  const isLoading = useSelector(getLoadingOrders)
  console.log('orderInCheckout', orderInCheckout);
  console.log('productsForOrder', productsForOrder);

  const [deliveryService, setDeliveryService] = useState('');
  
  const {
    client: {
      customerSecondName = '',
      customerFirstName = '',
      customerSurName = '',
      customerTel = '',
      customerId,
    }= {},
    orderSum,
    sellerName,
    _id,
    products,
    orderNumber,
  } = orderInCheckout;

  const {
    control,
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      delivery: '',
      secondName: customerSecondName ? customerSecondName : '',
      firstName: customerFirstName ? customerFirstName : '',
      surName: customerSurName ? customerSurName : '',
      tel: customerTel ? customerTel : '',
      department: '',
      city: '',
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const orderData = {
      orderId: _id,
      delivery: `${data.delivery.value}, ${data.city}, ${data.department}`,
      customerSecondName: data.secondName,
      customerFirstName: data.firstName,
      customerSurName: data.surName,
      customerTel: data.tel,
      customerId: customerId,
    };
    console.log('Відправка order', orderData);

    const updatedOrder = await dispatch(updateOrder(orderData));

    if (updatedOrder.payload.code === 200) {
      // for (const product of products) {
      //   await dispatch(updateUserBasket({ productId: product._id }));
      // }
      navigate('/profile/mypurchases');
    }
  };
  const labelName =
    deliveryService === 'УкрПошта'
      ? 'Введіть індекс(номер) відділення*'
      : 'Введіть номер відділення*';
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          {!isLoading && (
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
                {productsForOrder && products && (
                  <OrderProductsList
                    productsForOrder={productsForOrder}
                    products={products}
                  />
                )}

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
                </div>
                <FormField
                  labelText={labelName}
                  controllerName="city"
                  fieldName="city"
                  control={control}
                  register={register}
                />
                <FormField
                  labelText="Введіть місто*"
                  controllerName="department"
                  fieldName="deliveryDepartment"
                  control={control}
                  register={register}
                />
                <div>
                  <Text textClass="title" text="Ваші контактні дані" />
                  <FormField
                    labelText="Прізвище*"
                    controllerName="secondName"
                    fieldName="secondName"
                    control={control}
                    register={register}
                  />

                  <FormField
                    labelText="Ім'я*"
                    controllerName="firstName"
                    fieldName="firstName"
                    control={control}
                    register={register}
                  />

                  <FormField
                    labelText="По батькові*"
                    controllerName="surName"
                    fieldName="surName"
                    control={control}
                    register={register}
                  />

                  <FormField
                    labelText="Телефон +380*"
                    controllerName="tel"
                    fieldName="tel"
                    control={control}
                    register={register}
                  />
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
          )}
        </div>
      </section>
    </Container>
  );
};

export default Checkout;
