import { useSelector } from 'react-redux';
import { getLogin } from 'redux/auth/auth-selectors';
import SiteStatistic from 'components/SiteStatistic/SiteStatistic';

import s from './Default.module.scss';
import Slider from 'components/Slider/Slider';

const Default = () => {
  const isUserLogin = useSelector(getLogin);

  return (
    <section className={s.default}>
      <Slider />
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <h2 className={s.title}>Перш ніж почати зареєструйтеся!</h2>
        </div>
      )}

      {isUserLogin && (
        <>
          <SiteStatistic />
        </>
      )}
    </section>
  );
};

export default Default;
