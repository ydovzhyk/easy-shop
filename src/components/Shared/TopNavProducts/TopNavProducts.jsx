import { SlArrowRight } from 'react-icons/sl';
import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory }) => {
  return (
    <h2 className={s.titleText}>
      {category && (
        <>
          <span style={{ marginRight: '10px' }}>{category}</span>
          <SlArrowRight style={{ marginRight: '10px' }} />
        </>
      )}
      {subcategory && (
        <>
          <span style={{ marginRight: '10px' }}>{subcategory}</span>
          <SlArrowRight />
        </>
      )}
      {!category && !subcategory && <p>Пошук у всіх категоріях</p>}
    </h2>
  );
};

export default TopNavProducts;
