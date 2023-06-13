import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { getVipProducts } from 'redux/product/product-operations';
import {
  getVipProductCard,
  getVipPages,
} from 'redux/product/product-selectors';

import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import s from './CatalogList.module.scss';

const CatalogList = ({ newCards }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const arrayVipProdacts = useSelector(getVipProductCard);
  const vipPages = useSelector(getVipPages);

  useEffect(() => {
    dispatch(getVipProducts(currentPage));
  }, [dispatch, currentPage]);
  console.log(arrayVipProdacts);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < vipPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className={s.container}>
      <h3 className={s.titleText}>VIP-Оголошення</h3>
      <div className={s.styleButtonList}>
        {currentPage > 1 && (
          <div
            className={`${s.arrowButton} ${s.arrowButtonLeft}`}
            onClick={handlePrevPage}
          >
            <IoIosArrowDropleft size={64} className={s.arrowlink} />
          </div>
        )}
        <ul className={s.listCard}>
          {arrayVipProdacts.map(
            ({ _id, mainPhotoUrl, price, nameProduct, description }) => (
              <li className={s.itemCard} key={_id}>
                <Link to={`${_id}`} className={s.photoLink}>
                  <div className={s.stylePhotoCardWrap}>
                    <img
                      className={s.photoCard}
                      src={mainPhotoUrl}
                      onError={e => (e.target.src = NoPhoto)}
                      alt=""
                    />
                    <p className={s.descriptionProductCard}>{description}</p>
                  </div>
                </Link>

                <div className={s.stylePriceLike}>
                  <p className={s.priceCard}>{price}грн</p>
                  <div className={s.styleLike}>
                    <p className={s.likeCard}>7</p>
                    <NavLink to="/favorites" className={s.link}>
                      <FiHeart size={24} />
                    </NavLink>
                  </div>
                </div>
                <Link to={`${_id}`}>
                  <p className={s.nameProductCard}>{nameProduct}</p>
                </Link>
                <p className={s.sizeCard}>36</p>
              </li>
            )
          )}
        </ul>
        {currentPage < vipPages && (
          <div
            className={`${s.arrowButton} ${s.arrowButtonRight}`}
            onClick={handleNextPage}
          >
            <IoIosArrowDropright size={64} className={s.arrowlink} />
          </div>
        )}
      </div>

      <div className={s.titleText}>
        <h3 className={s.styleTitleText}>Новинки</h3>
        <h3 className={s.styleTitleText}>Знижки</h3>
        <h3 className={s.styleTitleText}>Топ-продавці</h3>
      </div>
      <ul className={s.listCard}>
        {newCards.map(({ id, photo, price, like, description, size }) => (
          <li className={s.itemCard} key={id}>
            <Link to={`${id}`} className={s.stylePhotoCard}>
              <img
                className={s.photoCard}
                // srcset={photo}
                src={photo}
                onError={e => (e.target.src = NoPhoto)}
                alt=""
              />
            </Link>
            <div className={s.stylePriceLike}>
              <p className={s.priceCard}>{price}грн</p>
              <div className={s.styleLike}>
                <p className={s.likeCard}>{like}</p>
                <NavLink to="/favorites" className={s.link}>
                  <FiHeart size={24} />
                </NavLink>
              </div>
            </div>
            <Link to={`${id}`}>
              <p className={s.descriptionCard}>{description}</p>
            </Link>
            <p className={s.sizeCard}>{size}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CatalogList;

// {photo ? (
//   <img
//     src={`https://image.tmdb.org/t/p/w200/${photo}`}
//     alt={name}
//   />
// ) : (
//   <img src={noActor} alt={name} width={200} height={450} />
// )}
