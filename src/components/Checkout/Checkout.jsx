import { useSelector } from 'react-redux';
import { selectProductsFromBasket } from 'redux/product/product-selectors';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import TextField from 'components/Shared/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import s from './Checkout.module.scss';

const Checkout = () => {
  const productsInOrder = useSelector(selectProductsFromBasket);
  const sellerName = 'Katya';
  const orderSum = '750';
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          <form>
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
              {productsInOrder.map(
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
            <div>
              <Text textClass="title" text="Спосіб доставки" />
              <SelectField
                name="delivery"
                className="addOrder"
                placeholder="Виберіть службу доставки"
                options={['Нова пошта', 'УкрПошта', 'Meest']}
              />
            </div>
            <div>
              <Text textClass="title" text="Ваші контактні дані" />
              <Text text={'Прізвище*'} textClass="productHeadings" />
              <TextField name="lastName" className="addOrder" />
              <Text text={"Ім'я*"} textClass="productHeadings" />
              <TextField name="firstName" className="addOrder" />
              <Text text={'По батькові*'} textClass="productHeadings" />
              <TextField name="middlename" className="addOrder" />
              <Text
                text={'Телефон +380*'}
                textClass="productHeadings"
                type="tel"
                placeholder="+380"
              />
              <TextField name="tel" className="addOrder" />
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
};

export default Checkout;
