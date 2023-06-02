import { useSelector } from 'react-redux';
import { getLogin } from 'redux/auth/auth-selectors';
import SiteStatistic from 'components/SiteStatistic/SiteStatistic';

import CatalogList from '../Catalog/CatalogList';
import vipCards from '../../data/vipCards.json';
import newCards from '../../data/newCards.json';
import s from './Default.module.scss';
import Slider from 'components/Slider/Slider';

const Default = () => {
  const isUserLogin = useSelector(getLogin);

  return (
    <section className={s.default}>
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <h2 className={s.title}>Перш ніж почати зареєструйтеся!</h2>
          {/* <CatalogList cards={cards} /> */}
        </div>
      )}
      <Slider />
      <CatalogList vipCards={vipCards} newCards={newCards} />
      {isUserLogin && (
        <>
          <SiteStatistic />
        </>
      )}
    </section>
  );
};

export default Default;
