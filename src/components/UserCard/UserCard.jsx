import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowerId, getCountPage } from 'redux/auth/auth-selectors.js';
import { getUsers, updateUser, getFollower } from 'redux/auth/auth-opetations';
import PropTypes from 'prop-types';

import Button from 'components/Shared/Button';
import Dropdown from 'components/Shared/Dropdown/Dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import logo from 'images/logo.svg';

import s from './UserCard.module.scss';

const UserCard = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageUsers, setPageUsers] = useState([]);
  const [filter, setFilter] = useState('show all');
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const countPage = useSelector(getCountPage);
  const followerIdStore = useSelector(getFollowerId);
  const followerIdLocalStore = JSON.parse(
    localStorage.getItem('followerIdNew')
  );

  let followerId = '';
  if (followerIdLocalStore) {
    followerId = followerIdLocalStore;
  } else {
    followerId = followerIdStore;
  }

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    setPageUsers([]);
    setPage(1);
  }, [filter]);

  useEffect(() => {
    const fetchFollower = async () => {
      await dispatch(getFollower());
    };
    const fetchUsers = async () => {
      const fetchedUsers = await dispatch(
        getUsers({ followerId: followerId, page: page, filter: filter })
      );
      const updatedUsers = fetchedUsers.payload.users.map(user => {
        const isFollowing = user.followersData.includes(followerId);
        return {
          ...user,
          following: isFollowing,
          followersData: [],
        };
      });
      setPageUsers(prevPageUsers => [...prevPageUsers, ...updatedUsers]);
    };
    if (followerId === 'new') {
      fetchFollower();
    }
    if (page && followerId !== 'new') {
      fetchUsers();
    }
  }, [page, dispatch, followerId, filter]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = useCallback(
    (_id, isFollowing) => {
      const updatedUsers = pageUsers.map(user => {
        if (user._id === _id) {
          const newFollowers = isFollowing
            ? user.followers - 1
            : user.followers + 1;
          if (isFollowing) {
            dispatch(
              updateUser({
                followerId: followerId,
                userId: _id,
                following: isFollowing,
              })
            );
          } else {
            dispatch(
              updateUser({
                followerId: followerId,
                userId: _id,
                following: isFollowing,
              })
            );
          }
          return {
            ...user,
            following: !isFollowing,
            followers: newFollowers,
          };
        } else {
          return user;
        }
      });
      setPageUsers(updatedUsers);
    },
    [dispatch, pageUsers, followerId]
  );

  return (
    <section className={s.userForm}>
      <div className={s.userDropdown}>
        <Dropdown value={filter} handleChange={setFilter} />
      </div>
      {Object.keys(pageUsers).length !== 0 && (
        <div className={s.userCardContainer}>
          {pageUsers.map(
            ({ _id, user, tweets, followers, avatar, following }) => (
              <div key={_id} className={s.userCard}>
                <div className={s.userCardBackground}>
                  <div className={s.cardLine}></div>
                  <div className={s.cardCircle}>
                    <div className={s.cardCircleBackground}>
                      <img
                        src={avatar}
                        alt={user}
                        width="57"
                        height="57"
                        className={s.cardAvatar}
                      />
                    </div>
                  </div>
                  <p className={s.cardTitleTw}>
                    {tweets.toLocaleString('en-US')} Tweets
                  </p>
                  <p className={s.cardTitleFo}>
                    {followers.toLocaleString('en-US')} Followers
                  </p>
                  <div className={s.cardBtn}>
                    <Button
                      text={following ? 'FOLLOWING' : 'FOLLOW'}
                      btnClass={following ? 'btnDark' : 'btnLight'}
                      handleClick={() => handleButtonClick(_id, following)}
                    />
                  </div>
                  <img
                    src={logo}
                    alt="web-site logo"
                    width="76"
                    className={s.cardLogo}
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
      {Object.keys(pageUsers).length !== 0 && countPage > page && (
        <div className={s.btn}>
          <Button
            text="Load more"
            btnClass="btnLight"
            handleClick={handleLoadMore}
          />
        </div>
      )}
      {showScrollButton && (
        <button className={s.scrollButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </section>
  );
};

UserCard.propTypes = {
  getFollowerId: PropTypes.string,
  getUsers: PropTypes.func,
  updateUser: PropTypes.func,
  getCountPage: PropTypes.number,
  dispatch: PropTypes.func,
};

export default UserCard;
