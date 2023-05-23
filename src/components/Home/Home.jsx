import Container from 'components/Shared/Container';
import Default from 'components/Default/Default';

import s from './Home.module.scss';

const Home = () => {
  return (
    <section className={s.home}>
      <Container>
        <Default />
      </Container>
    </section>
  );
};

export default Home;
