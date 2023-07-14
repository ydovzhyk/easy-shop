import { useMediaQuery } from 'react-responsive';
import { BiChevronRight } from 'react-icons/bi';

import { NavLink } from 'react-router-dom';

import { translateParamsToUA } from '../../../funcs&hooks/translateParamsToUA.js';
import { getDeclension } from '../../../funcs&hooks/getDeclansion.js';
import { getPath } from '../../../funcs&hooks/getPath.js';
import { getSubcategoryPath } from '../../../funcs&hooks/getSubCategoryPath.js';

import s from './TopNavProducts.module.scss';

const TopNavProducts = ({ category, subcategory, products, query }) => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const { categoryName, subCategoryName } = translateParamsToUA(
    category,
    subcategory
  );

  const mainCategoryFilter = products.reduce((acc, el) => {
    acc[el.section] = (acc[el.section] || 0) + 1;
    return acc;
  }, {});

  const subCategoriesFilter = products.reduce((acc, el) => {
    acc[el.category] = (acc[el.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className={s.catalogTitle}>
        {!category && !subcategory && (
          <>
            <h2 className={s.title}>Каталог - EASY Shop</h2>
            <BiChevronRight
              size={isDesctop ? 26 : isTablet ? 22 : 20}
              style={{ marginRight: '10px', flexShrink: '0' }}
            />
            {products.length !== 0 && (
              <span className={s.amountBox}>
                {getDeclension(products.length)}
              </span>
            )}
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
                {products.length !== 0 && (
                  <span className={s.amountBox}>
                    {getDeclension(products.length)}
                  </span>
                )}
              </div>
            </div>
          )}
        {categoryName !== category && !subcategory && (
          <>
            <h2 className={s.title}>{categoryName}</h2>
            {products.length !== 0 && (
              <span className={s.amountBox}>
                {getDeclension(products.length)}
              </span>
            )}
          </>
        )}
      </div>

      {!category && (
        <ul className={s.linkBox}>
          {Object.entries(mainCategoryFilter).map(([key, value], index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? s.active : s.link}`
                  }
                  to={getPath(query, key, true)}
                >
                  {key} -{' '}
                  <span className={s.amountBoxSecondary}>
                    {getDeclension(value)}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
      {category && !subcategory && products.length > 0 && (
        <ul className={s.linkBox}>
          {Object.entries(subCategoriesFilter).map(([key, val], index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `${isActive ? s.active : s.link}`
                  }
                  to={getSubcategoryPath(query, categoryName, key)}
                >
                  {key} -{' '}
                  <span
                    style={{ marginTop: '10px' }}
                    className={s.amountBoxSecondary}
                  >
                    {getDeclension(val)}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default TopNavProducts;
