import Container from 'components/Shared/Container';
import s from './Favorites.module.scss';

const Favorites = () => {
  return (
    <Container>
      <section className={s.default}>
        <div className={s.defaultBox}>
          <h2 className={s.title}>Favorites</h2>
        </div>
      </section>
    </Container>
  );
};

export default Favorites;
