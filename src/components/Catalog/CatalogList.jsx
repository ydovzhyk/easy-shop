import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import s from './CatalogList.module.scss';
import { FiHeart } from 'react-icons/fi';
// import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const CatalogList = ({ vipCards, newCards }) => {
  // IoIosArrowDropleft
  // console.log(cards);
  return (
    <section className={s.container}>
      <h3 className={s.titleText}>VIP-Оголошення</h3>
      {/* <button to="/favorites" className={s.arrowRight}>
        <IoIosArrowDropleft size={44} />
      </button> */}
      <ul className={s.listCard}>
        {vipCards.map(({ id, photo, price, like, description, size }) => (
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
                <NavLink to="/favorites" className={`${s.link} ${s.custom}`}>
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
      {/* <button to="/favorites" className={s.arrowLeft}>
        <IoIosArrowDropright size={44} />
      </button> */}
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
