import { useSelector } from 'react-redux';

import { getLogin } from 'redux/auth/auth-selectors';

import Catalog from '../Catalog/Catalog';

import s from './Default.module.scss';
import Slider from 'components/Slider/Slider';
import Text from 'components/Shared/Text/Text';

const Default = () => {
  const isUserLogin = useSelector(getLogin);

  return (
    <section className={s.default}>
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <Text text={'Перш ніж почати зареєструйтеся!'} textClass="title" />
        </div>
      )}
      <Slider />
      <Catalog />
    </section>
  );
};

export default Default;
