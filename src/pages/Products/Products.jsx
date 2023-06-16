import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { searchProducts } from 'redux/product/product-operations';
import { useSelector } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
// import { useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import s from './Products.module.scss';

const Products = () => {
  // const { category, subcategory } = useParams();
  const products = useSelector(getProductsByQuery);
  console.log(products);
  //   const [searchParams] = useSearchParams();
  //   const searchQuery = searchParams.get('search') ?? '';
  //   const dispatch = useDispatch();

  useEffect(() => {
    if (products.length < 1) {
      return;
    }

    // dispatch(searchProducts(searchQuery));
  }, [products.length]);

  return (
    <section className={s.container}>
      <ul className={s.listCard}>
        {products.map(
          ({
            _id,
            mainPhotoUrl,
            price,
            nameProduct,
            description,
            section,
            category,
          }) => (
            <li className={s.itemCard} key={_id}>
              <Link
                to={`/products/${section}/${category}/${_id}`}
                className={s.photoLink}
              >
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
              <Link to={`/products/${section}/${category}/${_id}`}>
                <p className={s.nameProductCard}>{nameProduct}</p>
              </Link>
              <p className={s.sizeCard}>36</p>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default Products;
