import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateSearchUserSibscribes } from 'redux/auth/auth-operations';
import {
  selectUserSearchSubscriptions,
  selectTotalUserSearchSubscriptionsPages,
} from 'redux/auth/auth-selectors';

import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import Text from 'components/Shared/Text/Text';
import { translateParamsToUA } from 'funcs&hooks/translateParamsToUA';
import { scrollToTop } from 'funcs&hooks/scrollToTop';
import sizeOption from 'components/AddProduct/Size/sizeTable.json';
import { filterPrices } from '../../Filter/filterPrice';
import { filterConditions } from '../../Filter/filterСonditions';

import s from 'components/Favorites/SelectedSearches/SelectedSearches.module.scss';

const SelectedSearches = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSearchSubscriptions = useSelector(selectUserSearchSubscriptions);
  const totalUserSearchSubscriptionsPages = useSelector(
    selectTotalUserSearchSubscriptionsPages
  );

  // userSearchSubscriptions.map(el => {
  //   let category = 'Каталог';
  //   let subCategory;
  //   const searchParamsToRender = [];
  //   if (
  //     el.includes('/product/women/') ||
  //     el.includes('/product/men/') ||
  //     el.includes('/product/children/') ||
  //     el.includes('/product/beauty&health/')
  //   ) {
  //     const { categoryName, subCategoryName } = translateParamsToUA(
  //       el.split('/')[2],
  //       el.split('/')[3]
  //     );
  //     category = categoryName;
  //     subCategory = subCategoryName;
  //   }
  //   const searchParams = el
  //     .split('?')
  //     .slice(1)
  //     .join('')
  //     .split('&')
  //     .map(el => el.split('='));
  //   searchParams.forEach(([key, value]) => {
  //     if (key === 'search') {
  //       searchParamsToRender.push(['Пошуковий запит', value]);
  //     }

  //     if (key === 'size') {
  //       const selectedSizesArray = [];
  //       const selectedIndexSizesArray = value.split('_');

  //       for (let [key, value] of Object.entries(sizeOption)) {
  //         for (let i = 0; i < selectedIndexSizesArray.length; i += 1) {
  //           if (selectedIndexSizesArray[i] === key) {
  //             selectedSizesArray.push([{ name: key, value: value }]);
  //           }
  //         }
  //         searchParamsToRender.push(['Розмір', selectedSizesArray]);
  //       }
  //     }

  //     if (key === 'price') {
  //       const selectedFilterPrice = filterPrices.find(
  //         (el, index) => Number(value) === index
  //       );

  //       searchParamsToRender.push(['Ціна', selectedFilterPrice]);
  //     }

  //     if (key === 'price_from') {
  //       searchParamsToRender.push(['Ціна - до', value]);
  //     }

  //     if (key === 'price_to') {
  //       searchParamsToRender.push(['Ціна - від ', value]);
  //     }

  //     if (key === 'condition') {
  //       let selectedConditions = [];
  //       const selectedIndexConditionsArray = value.split('_');
  //       selectedIndexConditionsArray.forEach(el => {
  //         selectedConditions.push(filterConditions[Number(el)]);
  //       });
  //       searchParamsToRender.push(['Стан', selectedConditions.join(', ')]);
  //     }
  //     if (key === 'brand') {
  //       searchParamsToRender.push(['Бренд', value]);
  //     }
  //   });
  // });

  const handleDeleteUserSearchSubscription = url => {
    dispatch(
      updateSearchUserSibscribes({ urlSubscription: url, statusDelete: true })
    );
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };
  return (
    <>
      <ul className={s.listCard}>
        {userSearchSubscriptions.length > 0 &&
          userSearchSubscriptions.map((el, index) => {
            let category = 'Каталог';
            let subCategory;
            const searchParamsToRender = [];
            if (
              el.includes('/product/women/') ||
              el.includes('/product/men/') ||
              el.includes('/product/children/') ||
              el.includes('/product/beauty&health/')
            ) {
              const { categoryName, subCategoryName } = translateParamsToUA(
                el.split('/')[2],
                el.split('/')[3]
              );
              category = categoryName;
              subCategory = subCategoryName;
            }
            const searchParams = el
              .split('?')
              .slice(1)
              .join('')
              .split('&')
              .map(el => el.split('='));
            searchParams.forEach(([key, value]) => {
              if (key === 'search') {
                searchParamsToRender.push(['Пошуковий запит', value]);
              }

              if (key === 'size') {
                const selectedIndexSizesArray = value.split('_');

                for (let [key, value] of Object.entries(sizeOption)) {
                  for (let i = 0; i < selectedIndexSizesArray.length; i += 1) {
                    if (selectedIndexSizesArray[i] === key) {
                      console.log(searchParamsToRender);

                      const indexOfSizeValues = searchParamsToRender.findIndex(
                        el => el[0] === 'Розмір'
                      );
                      console.log(indexOfSizeValues);
                      if (indexOfSizeValues >= 0) {
                        // console.log(
                        //   searchParamsToRender[indexOfSizeValues][1] +
                        //     `, EU: ${value[0].EU}/UA:${value[1].UA}/IN:${value[2].IN}`
                        // );
                        searchParamsToRender[indexOfSizeValues][1].replace(
                          searchParamsToRender[indexOfSizeValues][1],
                          searchParamsToRender[indexOfSizeValues][1] +
                            `EU: ${value[0].EU}/UA:${value[1].UA}/IN:${value[2].IN}`
                        );

                        // `EU: ${value[0].EU}/UA:${value[1].UA}/IN:${value[2].IN}`;
                      } else {
                        searchParamsToRender.push([
                          'Розмір',
                          `EU: ${value[0].EU}/UA:${value[1].UA}/IN:${value[2].IN}`,
                        ]);
                      }
                    }
                  }
                }
              }

              if (key === 'price') {
                const selectedFilterPrice = filterPrices.find(
                  (el, index) => Number(value) === index
                );

                searchParamsToRender.push(['Ціна', selectedFilterPrice]);
              }

              if (key === 'price_from') {
                searchParamsToRender.push([
                  'Ціна',
                  `${'від '}${value}${' грн'}`,
                ]);
              }

              if (key === 'price_to') {
                searchParamsToRender.push([
                  'Ціна',
                  `${'до '}${value}${' грн'}`,
                ]);
              }

              if (key === 'condition') {
                let selectedConditions = [];
                const selectedIndexConditionsArray = value.split('_');
                selectedIndexConditionsArray.forEach(el => {
                  selectedConditions.push(filterConditions[Number(el)]);
                });
                searchParamsToRender.push([
                  'Стан',
                  selectedConditions.join(', '),
                ]);
              }
              if (key === 'brand') {
                searchParamsToRender.push(['Бренд', value]);
              }
            });
            return (
              <li className={s.itemCard} key={index}>
                <div className={s.userframe}>
                  <div className={s.profilebox}>
                    <h5 className={s.username}>{category}</h5>
                  </div>
                  <div className={s.infowrapper}>
                    <p className={s.text}>
                      <span className={s.textStyle}>Категорія: </span>
                      {category}
                    </p>
                    <p className={s.text}>
                      <span className={s.textStyle}>Підкатегорія: </span>
                      {subCategory ?? 'Усі'}
                    </p>
                    {searchParamsToRender &&
                      searchParamsToRender.map(([key, value], index) => {
                        return (
                          <p key={index} className={s.text}>
                            <span className={s.textStyle}>{key}: </span>
                            {value}
                          </p>
                        );
                      })}
                  </div>
                  <div className={s.buttonWrapper}>
                    <Button
                      btnClass="btnLight"
                      text="Перейти"
                      handleClick={() => navigate(`${el}`)}
                    />
                  </div>
                </div>
                <RoundButton
                  icon={BsTrash}
                  handleClick={handleDeleteUserSearchSubscription}
                  id={el}
                />
              </li>
            );
          })}
      </ul>

      {userSearchSubscriptions && updateSearchUserSibscribes.length === 0 && (
        <Text
          text={'У вас немає обраних товарів'}
          textClass="after-title-text-warning"
        />
      )}
      {totalUserSearchSubscriptionsPages > 1 && (
        <Pagination
          totalPages={totalUserSearchSubscriptionsPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SelectedSearches;
