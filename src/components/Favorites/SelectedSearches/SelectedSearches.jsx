import { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateSearchUserSibscribes } from 'redux/auth/auth-operations';
import {
  selectUserSearchSubscriptions,
  selectTotalUserSearchSubscriptionsPages,
  getUserMessage,
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
import options from 'components/Products/options';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';

import s from 'components/Favorites/SelectedSearches/SelectedSearches.module.scss';

const SelectedSearches = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSearchSubscriptions = useSelector(selectUserSearchSubscriptions);
  const totalUserSearchSubscriptionsPages = useSelector(
    selectTotalUserSearchSubscriptionsPages
  );
  const message = useSelector(getUserMessage);
  const [questionWindow, setQuestionWindow] = useState(false);
  const [userSubscriptionUrl, setUserSubscriptionUrl] = useState(null);
  const [isMessage, setIsMessage] = useState('');

  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  const handleParseUserSearchSubscriptionUrl = url => {
    let category = 'Каталог';
    let subCategory;
    const searchParamsToRender = [];
    if (
      url.includes('/product/women/') ||
      url.includes('/product/men/') ||
      url.includes('/product/children/') ||
      url.includes('/product/beauty&health/')
    ) {
      const { categoryName, subCategoryName } = translateParamsToUA(
        url.split('/')[2],
        url.split('/')[3]
      );
      category = categoryName;
      subCategory = subCategoryName;
    }
    const searchParams = url
      .split('?')
      .slice(1)
      .join('')
      .split('&')
      .map(el => el.split('='));
    searchParams.forEach(([key, value]) => {
      if (key === 'search') {
        searchParamsToRender.push([
          'Пошуковий запит',
          decodeURIComponent(value),
        ]);
      }

      if (key === 'size') {
        const selectedIndexSizesArray = value.split('_');
        let allSelectedValues = [];
        for (let [key, value] of Object.entries(sizeOption)) {
          for (let i = 0; i < selectedIndexSizesArray.length; i += 1) {
            if (selectedIndexSizesArray[i] === key) {
              allSelectedValues.push(
                `EU:${value[0].EU}/UA:${value[1].UA}/IN:${value[2].IN}`
              );
            }
          }
        }
        searchParamsToRender.push(['Розмір', allSelectedValues.join(', ')]);
      }

      if (key === 'price') {
        const selectedFilterPrice = filterPrices.find(
          (url, index) => Number(value) === index
        );

        searchParamsToRender.push(['Ціна', selectedFilterPrice]);
      }

      if (key === 'price_from') {
        searchParamsToRender.push(['Ціна від', `${value}${' грн'}`]);
      }

      if (key === 'price_to') {
        searchParamsToRender.push(['Ціна до', `${value}${' грн'}`]);
      }

      if (key === 'condition') {
        let selectedConditions = [];
        const selectedIndexConditionsArray = value.split('_');
        selectedIndexConditionsArray.forEach(el => {
          selectedConditions.push(filterConditions[Number(el)]);
        });
        searchParamsToRender.push(['Стан', selectedConditions.join(', ')]);
      }
      if (key === 'brand') {
        searchParamsToRender.push(['Бренд', value]);
      }
      if (key === 'sort') {
        searchParamsToRender.push(['Сортування', options[value]]);
      }
    });

    return [category, subCategory, searchParamsToRender];
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };

  // for delete subscriptions
  const handleDeleteUserSearchSubscription = url => {
    setUserSubscriptionUrl(url);
    setQuestionWindow(true);
  };

  const deleteSubscriptions = async choice => {
    if (choice === 'yes') {
      await dispatch(
        updateSearchUserSibscribes({
          urlSubscription: userSubscriptionUrl,
          statusDelete: true,
        })
      );
      setQuestionWindow(false);
    } else if (choice === 'no') {
      setUserSubscriptionUrl(null);
      setQuestionWindow(false);
    }
  };

  const resetMessage = () => {
    setIsMessage('');
  };

  return (
    <>
      <ul className={s.listCard}>
        {userSearchSubscriptions.length > 0 &&
          userSearchSubscriptions.map((el, index) => {
            const [category, subCategory, searchParamsToRender] =
              handleParseUserSearchSubscriptionUrl(el);
            return (
              <li className={s.itemCard} key={index}>
                <div className={s.userframe}>
                  <div className={s.profilebox}>
                    <h5 className={s.username}>{category}</h5>
                  </div>
                  <div>
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
                </div>
                <div className={s.botomInfoWrapper}>
                  <div className={s.buttonWrapper}>
                    <Button
                      btnClass="btnLight"
                      text="Перейти"
                      handleClick={() => navigate(`${el}`)}
                    />
                  </div>
                  <RoundButton
                    icon={BsTrash}
                    handleClick={handleDeleteUserSearchSubscription}
                    id={el}
                  />
                </div>
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
      {questionWindow && (
        <MessageWindow
          text={'Are you sure you want to delete the subscribtion?'}
          confirmButtons={true}
          onConfirm={deleteSubscriptions}
        />
      )}
      {isMessage && (
        <MessageWindow text={`${message}`} onDismiss={resetMessage} />
      )}
    </>
  );
};

export default SelectedSearches;
