import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import { getUserLikesBasket } from 'redux/auth/auth-operations';
import {
  //   getID,
  // getUser,
  getUserDateCreate,
  //   getLikedProducts,
  //   getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';
import { deleteUserSubscriptions } from 'redux/otherUser/otherUser-operations';
import {
  selectUserSubscriptions,
  //   selectTotalPagesUserSubscription,
} from 'redux/otherUser/otherUser-selectors';

import { updateUserFunc } from '../../../funcs&hooks/updateUser';

// import Container from 'components/Shared/Container';
// import ProductItem from '../Shared/ProductItem/ProductItem';
// import Pagination from 'components/Shared/Pagination/Pagination';
// import Button from 'components/Shared/Button';
// import Text from 'components/Shared/Text/Text';
import DaysValue from 'components/Shared/helper/DaysValue';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';

import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/ProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import { BsCheck2, BsGeoAlt, BsHandbag, BsPeople } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

import s from './UserSubscriptions.module.scss';

// const TabTypes = {
//   PRODUCTS: 'products',
//   SELLERS: 'sellers',
// };

const UserSubscriptions = () => {
  const dispatch = useDispatch();

  const [userSubscriptionId, setUserSubscriptionId] = useState(null);
  // const [subscriptionsLength, setSubscriptionsLength] = useState(0);
  const [questionWindow, setQuestionWindow] = useState(false);

  // const user = useSelector(getUser);
  const userSubscriptions = useSelector(selectUserSubscriptions);
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

  // for delete subscriptions
  const handleDeleteSubscriptions = _id => {
    setUserSubscriptionId(_id);
    setQuestionWindow(true);
    console.log('handleDeleteSubscriptions called with _id:', _id);
  };

  const deleteSubscriptions = async choice => {
    if (choice === 'yes') {
      console.log('yes', userSubscriptionId);
      await dispatch(
        deleteUserSubscriptions({ userSubscriptionId: userSubscriptionId })
      );
      updateUserFunc(dispatch);
      setQuestionWindow(false);
    } else if (choice === 'no') {
      console.log('no');
      setUserSubscriptionId(null);
      setQuestionWindow(false);
    }
  };

  return (
    <>
      <ul className={s.listCard}>
        {userSubscriptions.map(({ _id, userAvatar, username, cityName }) => (
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
                  <UserRating rating={rating} gradesAmount={gradesAmount} />
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
                      <Value className={s.leftvalue}>{followersAmount}</Value>
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
            </NavLink>
            <RoundButton
              icon={BsTrash}
              handleClick={handleDeleteSubscriptions}
              id={_id}
            />
          </li>
        ))}
      </ul>
      {questionWindow && (
        <MessageWindow
          // text={`"Ви впевнені, що хочете видалити підписку на ${username}?"`}
          text={`"Ви впевнені, що хочете видалити підписку?"`}
          confirmButtons={true}
          onConfirm={deleteSubscriptions}
        />
      )}
    </>
  );
};

export default UserSubscriptions;
