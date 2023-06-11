import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from 'redux/product/product-operations';
// import { getProductsByQuery } from 'redux/product/product-selectors';
import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';

const ProductsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    // dispatch(searchProducts(searchQuery));
  }, [
    searchQuery,
    // , dispatch
  ]);
  console.log('123');
  return (
    <section>
      <Container>
        <h1>ProductsSearchPage</h1>
        <p>Search Query Is: {searchQuery}</p>
        <Filter />
      </Container>
    </section>
  );
};

export default ProductsSearchPage;
