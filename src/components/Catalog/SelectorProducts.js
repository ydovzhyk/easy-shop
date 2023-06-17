import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import newCards from '../../data/newCards.json';
import ProductItem from './ProductItem';

import { getVipProducts } from 'redux/product/product-operations';
import {
  getVipProductCard,
  getVipPages,
} from 'redux/product/product-selectors';

import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import s from './VipProducts.module.scss';

const SelectorProducts = ({ }) => {
    const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const arrayVipProdacts = useSelector(getVipProductCard);
  const vipPages = useSelector(getVipPages);

  useEffect(() => {
    dispatch(getVipProducts(currentPage));
  }, [dispatch, currentPage]);
  console.log(arrayVipProdacts);
    
    return (
<ul>{newCards.map(({ id, photo, price, like, description, size }) => (<li><Link to={`${id}`} className={s.stylePhotoCard}>
        <img
          className={s.photoCard}
          // srcset={photo}
          src={photo}
          onError={e => (e.target.src = NoPhoto)}
          alt=""></Link><div className={s.stylePriceLike}>
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
      <p className={s.sizeCard}>{size}</p></li>)</ul>)


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
     
    </li>
  ))}
</ul>;
    )
};

export default SelectorProducts;

