import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import { getUserLikesBasket } from 'redux/auth/auth-operations';
// import { getUserDateCreate } from 'redux/auth/auth-selectors';
import {
  updateUserSubscriptions,
  deleteUserSubscriptions,
} from 'redux/otherUser/otherUser-operations';
import {
  selectUserSubscriptions,
  selectTotalPagesUserSubscription,
} from 'redux/otherUser/otherUser-selectors';
import { updateUserFunc } from '../../../funcs&hooks/updateUser';

import DaysValue from 'components/Shared/helper/DaysValue';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import Pagination from 'components/Shared/Pagination/Pagination';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Text from 'components/Shared/Text/Text';

import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/ProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import { BsCheck2, BsGeoAlt, BsHandbag, BsPeople } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';

import s from './UserSubscriptions.module.scss';

const UserSubscriptions = () => {
  const dispatch = useDispatch();

  const [userSubscriptionId, setUserSubscriptionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionWindow, setQuestionWindow] = useState(false);

  const userSubscriptions = useSelector(selectUserSubscriptions);
  const totalPagesSubscription = useSelector(selectTotalPagesUserSubscription);

  const getDaysPassedFromDate = dateString => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const deltaTime = currentDate - date;
    const daysPassed = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  useEffect(() => {
    dispatch(updateUserSubscriptions({ currentPage }));
  }, [dispatch, currentPage]);

  // for delete subscriptions
  const handleDeleteSubscriptions = _id => {
    setUserSubscriptionId(_id);
    setQuestionWindow(true);
  };

  const deleteSubscriptions = async choice => {
    if (choice === 'yes') {
      await dispatch(
        deleteUserSubscriptions({ userSubscriptionId: userSubscriptionId })
      );
      updateUserFunc(dispatch);
      setQuestionWindow(false);
    } else if (choice === 'no') {
      setUserSubscriptionId(null);
      setQuestionWindow(false);
    }
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
    <>
      {userSubscriptions && (
        <ul className={s.listCard}>
          {userSubscriptions.map(
            ({
              _id,
              userAvatar,
              username,
              cityName,
              rating,
              userFeedback,
              dateCreate,
              userFollowers,
              successfulSales,
            }) => (
              <li className={s.itemCard} key={_id}>
                <NavLink to={`/member/${_id}`}>
                  <div className={s.avatarframe}>
                    <div className={s.avatar}>
                      {userAvatar && (
                        <Avatar src={userAvatar} avatarClass="photoAvatar" />
                      )}
                    </div>
                  </div>
                  <div className={s.userframe}>
                    <div className={s.profilebox}>
                      <h5 className={s.username}>{username}</h5>
                      <UserRating
                        rating={rating}
                        gradesAmount={userFeedback?.length || 0}
                      />
                    </div>
                    <div className={s.infowrapper}>
                      <BsCheck2 className={s.iconBefore} />
                      <p className={s.text}>На Easy shop</p>
                      <DaysValue
                        value={getDaysPassedFromDate(dateCreate)}
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
                            {userFollowers?.length || 0}
                          </Value>
                          підписників
                        </p>
                      </div>
                      <div className={s.infowrapper}>
                        <BsHandbag className={s.iconBefore} />
                        <p className={s.text}>
                          <Value className={s.leftvalue}>
                            {successfulSales}
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
        </ul>
      )}
      {questionWindow && (
        <MessageWindow
          text={`"Ви впевнені, що хочете видалити підписку?"`}
          confirmButtons={true}
          onConfirm={deleteSubscriptions}
        />
      )}
      {userSubscriptions && userSubscriptions.length === 0 && (
        <Text
          text={'У вас немає обраних продавців'}
          textClass="after-title-text-warning"
        />
      )}
      <Pagination
        totalPages={totalPagesSubscription}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UserSubscriptions;
