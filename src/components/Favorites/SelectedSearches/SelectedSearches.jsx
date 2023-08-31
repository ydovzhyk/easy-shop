import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateSearchUserSibscribes } from 'redux/auth/auth-operations';
import {
  selectUserSearchSubscriptions,
  selectTotalSearchSubscriptionsPages,
} from 'redux/auth/auth-selectors';

import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import Text from 'components/Shared/Text/Text';
import { translateParamsToUA } from 'funcs&hooks/translateParamsToUA';
import { scrollToTop } from 'funcs&hooks/scrollToTop';

import s from 'components/Favorites/SelectedSearches/SelectedSearches.module.scss';

const SelectedSearches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSearchSubscriptions = useSelector(selectUserSearchSubscriptions);
  const totalSearchSubscriptionsPages = useSelector(
    selectTotalSearchSubscriptionsPages
  );
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
            console.log(el.split('?'));

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
                    <p className={s.text}>
                      <span className={s.textStyle}>Розмір: </span>{' '}
                      {`EU: 36 / UA: 44 / IN: S`}
                    </p>
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
      <Pagination
        totalPages={totalSearchSubscriptionsPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SelectedSearches;
