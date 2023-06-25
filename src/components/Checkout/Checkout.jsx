import Container from 'components/Shared/Container';
import s from './Checkout.module.scss';

const Checkout = () => {
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          <h2 className={s.title}>Checkout</h2>
        </div>
      </section>
    </Container>
  );
};

export default Checkout;
