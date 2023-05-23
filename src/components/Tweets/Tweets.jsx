import UserCard from 'components/UserCard/UserCard';
import s from './Tweets.module.scss';

import Container from 'components/Shared/Container';

const Tweets = () => {
  return (
    <section className={s.tweets}>
      <Container>
        <UserCard />
      </Container>
    </section>
  );
};

export default Tweets;
