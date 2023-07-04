import { useMediaQuery } from 'react-responsive';
import { BiChevronRight } from 'react-icons/bi';
import { translateParamsToUA } from '../../../funcs&hooks/translateParamsToUA.js';
import { getDeclension } from '../../../funcs&hooks/getDeclansion.js';
import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory }) => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  return (
    <div className={s.catalogTitle}>
      {!category && !subcategory && (
        <>
          <h2 className={s.title}>Каталог - EASY Shop</h2>
          <BiChevronRight
            size={isDesctop ? 26 : isTablet ? 22 : 20}
            style={{ marginRight: '10px', flexShrink: '0' }}
          />
          <span className={s.amountBox}>{getDeclension(11)}</span>
        </>
      )}
      {categoryName !== category &&
        subcategory &&
        subCategoryName !== subcategory && (
          <div className={s.wrapper}>
            <div className={s.mainTitleBox}>
              <h2 className={s.title}>{categoryName}</h2>
              <BiChevronRight size={isDesctop ? 24 : isTablet ? 20 : 18} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 className={s.secondaryTitle}>{subCategoryName}</h3>
              <span className={s.amountBox}>{getDeclension(11)}</span>
            </div>
          </div>
        )}
      {categoryName !== category && !subcategory && (
        <>
          <h2 className={s.title}>{categoryName}</h2>
          <span className={s.amountBox}>{getDeclension(11)}</span>
        </>
      )}
    </div>
  );
};

export default TopNavProducts;
