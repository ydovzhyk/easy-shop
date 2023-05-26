import Container from 'components/Shared/Container';
import s from './Basket.module.scss';

const Basket = () => {
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          <h2 className={s.title}>Basket</h2>
        </div>
      </section>
    </Container>
  );
};

export default Basket;
