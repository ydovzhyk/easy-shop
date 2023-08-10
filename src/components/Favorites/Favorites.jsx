import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLikesBasket } from 'redux/auth/auth-opetations';
import {
  getID,
  getUserDateCreate,
  getLikedProducts,
  getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';
import { updateUserSubscriptions } from 'redux/otherUser/otherUser-operations';
import {
  selectUserSubscriptions,
  selectTotalPagesUserSubscription,
} from 'redux/otherUser/otherUser-selectors';

import Container from 'components/Shared/Container';
import ProductItem from '../Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button';
import Text from 'components/Shared/Text/Text';
import DaysValue from 'components/Shared/helper/DaysValue';

import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/UserProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import { BsCheck2, BsGeoAlt, BsHandbag, BsPeople } from 'react-icons/bs';

import s from './Favorites.module.scss';

const TabTypes = {
  PRODUCTS: 'products',
  SELLERS: 'sellers',
};

const Favorites = () => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabTypes.PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);

  const userId = useSelector(getID);
  const likedProducts = useSelector(getLikedProducts);
  const totalLikedPages = useSelector(getTotalLikedProductsPages);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  const totalPagesSubscription = useSelector(selectTotalPagesUserSubscription);
  const dateCreate = useSelector(getUserDateCreate);

  const getDaysPassedFromDate = dateString => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const deltaTime = currentDate - date;
    const daysPassed = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  const rating = 3.2;
  const gradesAmount = 12;
  const daysAmount = getDaysPassedFromDate(dateCreate);
  const followersAmount = 36;
  const salesAmount = 16;

  useEffect(() => {
    dispatch(getUserLikesBasket({currentPage}));
    dispatch(updateUserSubscriptions({currentPage}));

    setIsLiked(false);
  }, [dispatch, selectedTab, isLiked, currentPage]);

  // for likes
  const checkUserLike = productId => {
    const product = likedProducts.find(item => item._id === productId);

    if (product) {
      return product.userLikes.includes(userId);
    }
    return false;
  };

  const handleLike = isLiked => {
    setIsLiked(isLiked);
  };

  // for scroling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <Container>
      <section className={s.likesSection}>
        <div className={s.btnSelect}>
          <div className={s.wrapper}>
            <Button
              text="Обрані товари"
              type="button"
              handleClick={() => setSelectedTab(TabTypes.PRODUCTS)}
              btnClass={
                selectedTab === TabTypes.PRODUCTS
                  ? 'exitHeaderBtnDialogue'
                  : 'exitHeaderBtn'
              }
            />
          </div>
          <div className={s.wrapper}>
            <Button
              text="Обрані продавці"
              type="button"
              handleClick={() => setSelectedTab(TabTypes.SELLERS)}
              btnClass={
                selectedTab === TabTypes.SELLERS
                  ? 'exitHeaderBtnDialogue'
                  : 'exitHeaderBtn'
              }
            />
          </div>
        </div>

        {selectedTab === TabTypes.PRODUCTS &&
        likedProducts &&
        likedProducts.length > 0 ? (
          <>
            <ul className={s.listCard}>
              {likedProducts.map(item => (
                <ProductItem
                  key={item._id}
                  _id={item._id}
                  mainPhotoUrl={item.mainPhotoUrl}
                  price={item.price}
                  likes={item.userLikes.length ? item.userLikes.length : 0}
                  userLike={checkUserLike(item._id)}
                  handleLike={handleLike}
                  nameProduct={item.nameProduct}
                  description={item.description}
                  size={item.size}
                  section={item.section}
                  category={item.category}
                />
              ))}
            </ul>
            <Pagination
              totalPages={totalLikedPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : selectedTab === TabTypes.SELLERS &&
          userSubscriptions &&
          userSubscriptions.length > 0 ? (
          <>
            <ul className={s.listCard}>
              {userSubscriptions.map(
                ({ _id, userAvatar, firstName, lastVisit, cityName }) => (
                  <li key={_id} className={s.itemCard}>
                    <div className={s.avatarframe}>
                      <div className={s.avatar}>
                        <Avatar src={userAvatar} avatarClass="photoAvatar" />
                      </div>
                    </div>
                    <div className={s.userframe}>
                      <div className={s.profilebox}>
                        <h5 className={s.username}>{firstName}</h5>
                        <UserRating
                          rating={rating}
                          gradesAmount={gradesAmount}
                        />
                      </div>
                      <div className={s.infowrapper}>
                        <BsCheck2 className={s.iconBefore} />
                        <p className={s.text}>На Easy shop</p>
                        <DaysValue
                          value={daysAmount}
                          className={`${s.rightvalue} ${s.text}`}
                        />
                      </div>
                      <div className={s.profileinfo}>
                        <div className={s.infowrapper}>
                          <BsGeoAlt className={s.iconBefore} />
                          <p className={s.text}>{cityName}</p>
                        </div>
                        <div className={s.infowrapper}>
                          <BsPeople className={s.iconBefore} />
                          <p className={s.text}>
                            <Value className={s.leftvalue}>
                              {followersAmount}
                            </Value>
                            підписників
                          </p>
                        </div>
                        <div className={s.infowrapper}>
                          <BsHandbag className={s.iconBefore} />
                          <p className={s.text}>
                            <Value className={s.leftvalue}>{salesAmount}</Value>
                            продажів
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
            <Pagination
              totalPages={totalPagesSubscription}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <Text text="В обраному нічого немає" />
        )}
      </section>
    </Container>
  );
};

export default Favorites;
