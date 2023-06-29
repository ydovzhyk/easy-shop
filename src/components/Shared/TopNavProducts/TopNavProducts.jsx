import { SlArrowRight } from 'react-icons/sl';
import { translateParamsToUA } from '../../../funcs&hooks/translateParamsToUA.js';
import { getDeclension } from '../../../funcs&hooks/getDeclansion.js';
import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory }) => {
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  return (
    <div className={s.catalogTitle}>
      {!category && !subcategory && (
        <>
          <h2 style={{ marginRight: '10px' }}>Каталог - EASY Shop</h2>
          <SlArrowRight style={{ marginRight: '10px' }} />
          <span className={s.amountBox}>{getDeclension(11)}</span>
        </>
      )}
      {categoryName !== category && (
        <>
          <h2 style={{ marginRight: '10px' }}>{categoryName}</h2>
          <SlArrowRight style={{ marginRight: '10px' }} />
        </>
      )}
      {/* {categoryName === category && (
        <>
          <h2 style={{ marginRight: '10px' }}>Товар відсутній</h2>
          <SlArrowRight style={{ marginRight: '10px' }} />
        </>
      )} */}
      {subCategoryName !== subcategory && (
        <>
          <h2 style={{ marginRight: '10px' }}>{subCategoryName}</h2>
          <SlArrowRight />
        </>
      )}
    </div>
  );
};

export default TopNavProducts;
