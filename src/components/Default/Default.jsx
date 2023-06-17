import { useSelector } from 'react-redux';

import { getLogin } from 'redux/auth/auth-selectors';
// import { getProducts } from 'redux/product/product-selectors';

import Catalog from '../Catalog/Catalog';
// import vipCards from '../../data/vipCards.json';
import newCards from '../../data/newCards.json';
import s from './Default.module.scss';
// import Slider from 'components/Slider/Slider';
import Carousel from 'components/Carusel/Carusel';
import Text from 'components/Shared/Text/Text';

const Default = () => {
  const isUserLogin = useSelector(getLogin);

  // const products = useSelector(getProducts);

  return (
    <section className={s.default}>
      {!isUserLogin && (
        <div className={s.defaultTitle}>
          <Text text={'Перш ніж почати зареєструйтеся!'} textClass="title" />
          {/* <CatalogList cards={cards} /> */}
        </div>
      )}
      <Carousel />
      {/* <Slider /> */}
      <Catalog
        // vipCards={vipCards}
        newCards={newCards}

        // addCards={products}
      />
    </section>
  );
};

export default Default;
