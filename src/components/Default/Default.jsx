import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getIsRefreshing, getLogin } from 'redux/auth/auth-selectors';

import Catalog from '../Catalog/Catalog';
import Carousel from 'components/Carusel/Carusel';
import Text from 'components/Shared/Text/Text';
import useScreenResizing from '../../funcs&hooks/useScreenResizing';

import s from './Default.module.scss';

const Default = () => {
  const isUserLogin = useSelector(getLogin);
  const isRefreshing = useSelector(getIsRefreshing);
  const [searchParams] = useSearchParams();
  const isGoogleAuthReturn = Boolean(searchParams.get('accessToken'));

  const viewPort = useScreenResizing();
  const isMobile = viewPort.width < 768;

  return (
    <section className={s.default}>
      {!isUserLogin && !isRefreshing && !isGoogleAuthReturn && (
        <div className={s.defaultTitle}>
          <Text
            text={'Перш ніж почати, зареєструйтеся!'}
            textClass="catalogTitle"
          />
        </div>
      )}
      {!isMobile && (
        <>
          <Carousel />
        </>
      )}
      <Catalog />
    </section>
  );
};

export default Default;
