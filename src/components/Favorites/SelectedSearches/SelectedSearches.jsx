import { BsTrash } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';

import {
  useSelector,
  // useDispatch
} from 'react-redux';
// import { updateSearchUserSibscribes } from 'redux/auth/auth-operations';
import { selectUserSearchSubscriptions } from 'redux/auth/auth-selectors';

import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import { translateParamsToUA } from 'funcs&hooks/translateParamsToUA';

import s from 'components/Favorites/SelectedSearches/SelectedSearches.module.scss';

const SelectedSearches = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSearchSubscriptions = useSelector(selectUserSearchSubscriptions);
  // const handleDeleteUserSearchSubscription = () => {
  //   dispatch(
  //     updateSearchUserSibscribes({ urlSubscription: pathname + search })
  //   );
  // };

  return (
    <>
      <ul className={s.listCard}>
        {userSearchSubscriptions.length > 0 &&
          userSearchSubscriptions.map((el, index) => {
            let category = 'Каталог';
            let subCategory;

            if (
              el.includes('/product/women') ||
              el.includes('/product/men') ||
              el.includes('/product/children') ||
              el.includes('/product/beauty&health')
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
                  // handleClick={handleDeleteUserSearchSubscription}
                  // id={_id}
                />
              </li>
            );
          })}
      </ul>

      {/* {likedProducts && (
        <ul className={s.listCard}>
          {likedProducts.map(item => (
            <ProductItem
              key={item._id}
              _id={item._id}
              userId={userId}
              mainPhotoUrl={item.mainPhotoUrl}
              price={item.price}
              likes={item.userLikes.length ? item.userLikes.length : 0}
              userLike={checkUserLike(item._id)}
              isLiked={isLiked}
              handleLike={handleLike}
              nameProduct={item.nameProduct}
              owner={item.owner}
              description={item.description}
              size={item.size}
              section={item.section}
              category={item.category}
              vip={item.vip}
              sale={item.sale}
            />
          ))}
        </ul>
      )} */}
      <p>У вас немає обраних пошуків</p>
      <Pagination
      // totalPages={totalLikedPages}
      // currentPage={currentPage}
      // onPageChange={handlePageChange}
      />
    </>
  );
};

export default SelectedSearches;
