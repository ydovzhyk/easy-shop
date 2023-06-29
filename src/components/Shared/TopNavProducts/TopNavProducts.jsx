import { SlArrowRight } from 'react-icons/sl';
import { translateParamsToUA } from '../../../funcs&hooks/translateParamsToUA.js';
import { getDeclension } from '../../../funcs&hooks/getDeclansion.js';
import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory }) => {
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
  console.log(categoryName);
  console.log(category);
  console.log(subCategoryName);
  console.log(subcategory);
  return (
    <div className={s.catalogTitle}>
      {!category && !subcategory && (
        <>
          <h2 style={{ marginRight: '10px' }}>Каталог - EASY Shop</h2>
          <SlArrowRight style={{ marginRight: '10px' }} />
          <span className={s.amountBox}>{getDeclension(11)}</span>
        </>
      )}
      {categoryName !== category &&
        subcategory &&
        subCategoryName !== subcategory && (
          <>
            <h2 style={{ marginRight: '10px' }}>{categoryName}</h2>
            <SlArrowRight size={16} style={{ marginRight: '10px' }} />
            <h2 style={{ marginRight: '10px' }}>
              {subCategoryName} -{'  '}
            </h2>
            <span className={s.amountBox}>{getDeclension(11)}</span>
          </>
        )}
      {categoryName !== category && !subcategory && (
        <>
          <h2 style={{ marginRight: '10px' }}>
            {categoryName} -{'  '}
          </h2>
          <span className={s.amountBox}>{getDeclension(11)}</span>
        </>
      )}
    </div>
  );
};

export default TopNavProducts;
