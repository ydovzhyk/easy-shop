import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import { BsTrash } from 'react-icons/bs';

import s from 'components/Favorites/SelectedSearches/SelectedSearches.module.scss';

const SelectedSearches = () => {
  // const dispatch = useDispatch();

  return (
    <>
      <ul className={s.listCard}>
        <li className={s.itemCard}>
          <div className={s.userframe}>
            <div className={s.profilebox}>
              <h5 className={s.username}>Жінкам</h5>
            </div>
            <div className={s.infowrapper}>
              <p className={s.text}>
                <span className={s.textStyle}>Категорія: </span>Жінкам
              </p>
              <p className={s.text}>
                <span className={s.textStyle}>Підкатегорія: </span> Спортивний
                одяг
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
                // handleClick={handleLoadMore}
              />
            </div>
          </div>
          <RoundButton
            icon={BsTrash}
            // handleClick={handleDeleteSubscriptions}
            // id={_id}
          />
        </li>
        <li className={s.itemCard}>
          <div className={s.userframe}>
            <div className={s.profilebox}>
              <h5 className={s.username}>Краса та здоров'я</h5>
            </div>
            <div className={s.infowrapper}>
              <p className={s.text}>
                <span className={s.textStyle}>Категорія: </span>Краса та здоров'я
              </p>
              <p className={s.text}>
                <span className={s.textStyle}>Підкатегорія: </span> Косметика для обличчя
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
                // handleClick={handleLoadMore}
              />
            </div>
          </div>
          <RoundButton
            icon={BsTrash}
            // handleClick={handleDeleteSubscriptions}
            // id={_id}
          />
        </li>
        <li className={s.itemCard}>
          <div className={s.userframe}>
            <div className={s.profilebox}>
              <h5 className={s.username}>Чоловікам</h5>
            </div>
            <div className={s.infowrapper}>
              <p className={s.text}>
                <span className={s.textStyle}>Категорія: </span>Чоловікам
              </p>
              <p className={s.text}>
                <span className={s.textStyle}>Підкатегорія: </span> Сорочки та
                теніски
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
                // handleClick={handleLoadMore}
              />
            </div>
          </div>
          <RoundButton
            icon={BsTrash}
            // handleClick={handleDeleteSubscriptions}
            // id={_id}
          />
        </li>
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
      {/* <Pagination
        totalPages={totalLikedPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
    </>
  );
};

export default SelectedSearches;
