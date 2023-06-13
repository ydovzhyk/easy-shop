import Container from 'components/Shared/Container/Container';
import s from './ProductCard.module.scss';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import { BsSuitHeart } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

const ProductCard = () => {
  return (
    <section className={s.productCard}>
      <Container>
        <div>
          <div className={s.fotoGalery}>foto</div>
        </div>
        <p className={s.availability}>В наявності</p>
        <Text text="Футболка з принтом" textClass="productName" />
        <Text text="349 грн" textClass="productName" />
        <Text text="Розміри:" textClass="productLabels" />
        <div className={s.size}>
          <Text
            text={`EU: 40 / UA: 48 / IN: L `}
            textClass="after-title-bigger"
          />
        </div>
        <Button type="button" btnClass="btnLight" text="Купити зараз" />
        <Button type="button" text="Додати до кошика" />
        <div className={s.favorite}>
          <BsSuitHeart className={s.favoriteIcon} />
          <Text text="Додати в обрані" textClass="productText" />
        </div>
        <div className={s.favorite}>
          <BiMessageDetail className={s.favoriteIcon} />
          <Text text="Поставити запитання" textClass="productText" />
        </div>
      </Container>
    </section>
  );
};

export default ProductCard;
