import ukrPoshtaIcon from '../../images/product-card/ic_ukrposhta.png';
import novaPoshtaIcon from '../../images/product-card/ic_novaposhta.png';
import meestPoshtaIcon from '../../images/product-card/ic_meest.png';
import Text from 'components/Shared/Text/Text';
import s from './ProductCard.module.scss';

const DeliveryList = () => {
  return (
    <div>
      <Text text="Способи доставки:" textClass="productHeadings" />
      <ul className={s.deliveryList}>
        <li className={s.deliveryItem}>
          <img
            src={ukrPoshtaIcon}
            alt="Нова Пошта"
            className={s.deliveryIcon}
          />
          <Text text="Укрпошта" textClass="productText" />
          <Text text="від 25 грн" textClass="text" />
        </li>
        <li className={s.deliveryItem}>
          <img
            src={novaPoshtaIcon}
            alt="Нова Пошта"
            className={s.deliveryIcon}
          />
          <Text text="Нова Пошта" textClass="productText" />
          <Text text="від 50 грн" textClass="text" />
        </li>
        <li className={s.deliveryItem}>
          <img
            src={meestPoshtaIcon}
            alt="Нова Пошта"
            className={s.deliveryIcon}
          />
          <Text text="Meest" textClass="productText" />
          <Text text="Акція! 20 грн (до 10 кг)" textClass="text" />
        </li>
      </ul>
    </div>
  );
};

export default DeliveryList;
