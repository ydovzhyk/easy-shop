import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import { getUserLikesBasket } from 'redux/auth/auth-operations';
import {
  // getID,
  getUser,
  // getUserDateCreate,
  getLikedProducts,
  getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';
import { updateUserSubscriptions } from 'redux/otherUser/otherUser-operations';
import {
  selectUserSubscriptions,
  selectTotalPagesUserSubscription,
} from 'redux/otherUser/otherUser-selectors';

import Container from 'components/Shared/Container';
import LikedProducts from './LikedProducts/LikedProducts';
import UserSubscriptions from './UserSubscriptions/UserSubscriptions';

// import ProductItem from '../Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button';
import Text from 'components/Shared/Text/Text';

import s from './Favorites.module.scss';

const TabTypes = {
  PRODUCTS: 'products',
  SELLERS: 'sellers',
};

const Favorites = () => {
  const dispatch = useDispatch();
  // const [userSubscriptionId, setUserSubscriptionId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TabTypes.PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [userLikesLength, setUserLikesLength] = useState(0);
  const [subscriptionsLength, setSubscriptionsLength] = useState(0);

  // const userId = useSelector(getID);
  const user = useSelector(getUser);
  const likedProducts = useSelector(getLikedProducts);
  const totalLikedPages = useSelector(getTotalLikedProductsPages);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  const totalPagesSubscription = useSelector(selectTotalPagesUserSubscription);

  useEffect(() => {
    dispatch(getUserLikesBasket({ currentPage }));
    dispatch(updateUserSubscriptions({ currentPage }));

    setIsLiked(false);
  }, [dispatch, selectedTab, isLiked, currentPage]);

  useEffect(() => {
    if (user && user.userLikes) {
      setUserLikesLength(user.userLikes.length);
    } else {
      setUserLikesLength(0);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.userSubscriptions) {
      setSubscriptionsLength(user.userSubscriptions.length);
    } else {
      setSubscriptionsLength(0);
    }
  }, [user]);

  // // for likes
  // const checkUserLike = productId => {
  //   const product = likedProducts.find(item => item._id === productId);

  //   if (product) {
  //     return product.userLikes.includes(userId);
  //   }
  //   return false;
  // };

  // // const handleLike = isLiked => {
  // //   setIsLiked(isLiked);
  // // };
  // const handleLike = productId => {
  //   const product = likedProducts.find(item => item._id === productId);

  //   if (product) {
  //     // Видалити
  //     const updatedLikedProducts = [...likedProducts];
  //     updatedLikedProducts.splice(product, 1);
  //     dispatch(getUserLikesBasket(updatedLikedProducts));

  //     // Оновити
  //     dispatch(getUserLikesBasket(updatedLikedProducts));
  //   }
  // };

  // for scroling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };

  // // for delete subscriptions
  // const handleDeleteSubscriptions = _id => {
  //   setUserSubscriptionId(_id);
  //   setQuestionWindow(true);
  //   console.log('handleDeleteSubscriptions called with _id:', _id);
  // };

  // const deleteSubscriptions = choice => {
  //   if (choice === 'yes') {
  //     console.log('yes', userSubscriptionId);
  //     dispatch(
  //       updateUserSubscriptions({ userSubscriptionId: userSubscriptionId })
  //     );
  //     setQuestionWindow(false);
  //   } else if (choice === 'no') {
  //     console.log('no');
  //     setUserSubscriptionId(null);
  //     setQuestionWindow(false);
  //   }
  // };

  return (
    <Container>
      <section className={s.likesSection}>
        <div className={s.btnSelect}>
          <div className={s.wrapper}>
            <Button
              text={`Обрані товари - ${userLikesLength}`}
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
              text={`Обрані продавці - ${subscriptionsLength}`}
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
            <LikedProducts to="liked-products" />
            {/* <ul className={s.listCard}>
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
            </ul> */}
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
            <UserSubscriptions to="user-subscriptions" />
            {/* <ul className={s.listCard}>
              {userSubscriptions.map(
                ({ _id, userAvatar, username, cityName }) => (
                  <li className={s.itemCard} key={_id}>
                    <NavLink to={`/member/${_id}`}>
                      <div className={s.avatarframe}>
                        <div className={s.avatar}>
                          <Avatar src={userAvatar} avatarClass="photoAvatar" />
                        </div>
                      </div>
                      <div className={s.userframe}>
                        <div className={s.profilebox}>
                          <h5 className={s.username}>{username}</h5>
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
                              <Value className={s.leftvalue}>
                                {salesAmount}
                              </Value>
                              продажів
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    <RoundButton
                      icon={BsTrash}
                      handleClick={handleDeleteSubscriptions}
                      id={_id}
                    />
                  </li>
                )
              )}
            </ul> */}
            {/* {questionWindow && (
              <MessageWindow
                // text={`"Ви впевнені, що хочете видалити підписку на ${username}?"`}
                text={`"Ви впевнені, що хочете видалити підписку?"`}
                confirmButtons={true}
                onConfirm={deleteSubscriptions}
              />
            )} */}
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
