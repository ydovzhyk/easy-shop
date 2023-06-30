import { useSelector } from 'react-redux';

import { getLogin } from 'redux/auth/auth-selectors';

import Catalog from '../Catalog/Catalog';
import Carousel from 'components/Carusel/Carusel';
import Text from 'components/Shared/Text/Text';
import s from './Default.module.scss';

const Default = () => {
  const isUserLogin = useSelector(getLogin);

  return (
    <section className={s.default}>
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <Text
            text={'Перш ніж почати зареєструйтеся!'}
            textClass="catalogTitle"
          />
        </div>
      )}
      <Carousel />
      <Catalog />
    </section>
  );
};

export default Default;
