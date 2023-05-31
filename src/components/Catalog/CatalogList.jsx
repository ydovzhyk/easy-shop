import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import s from './CatalogList.module.scss';
import { FiHeart } from 'react-icons/fi';

const CatalogList = ({ cards }) => {
  // console.log(cards);
  return (
    <section className={s.container}>
      <h3 className={s.titleText}>VIP-Оголошення</h3>
      <ul className={s.listCard}>
        {cards.map(({ id, photo, price, like, description, size }) => (
          <li className={s.itemCard} key={id}>
            <Link to={`${id}`}>
              <div className={s.stylePhotoCard}>
                <img
                  className={s.photoCard}
                  src={photo}
                  onError={e => (e.target.src = NoPhoto)}
                  alt=""
                />
              </div>
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
      <div className={s.titleText}>
        <h3 className={s.styleTitleText}>Новинки</h3>
        <h3 className={s.styleTitleText}>Знижки</h3>
        <h3 className={s.styleTitleText}>Топ-продавці</h3>
      </div>
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
