// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { searchProducts } from 'redux/product/product-operations';
// import { getProductsByQuery } from 'redux/product/product-selectors';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { productId } = useParams();
  console.log(productId);
  //   const [searchParams] = useSearchParams();
  //   const searchQuery = searchParams.get('search') ?? '';
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (searchQuery === '') {
  //       return;
  //     }

  //     dispatch(searchProducts(searchQuery));
  //   }, [searchQuery, dispatch]);

  return (
    <section>
      <h2>Товари для {productId}</h2>
    </section>
  );
};

export default Products;
