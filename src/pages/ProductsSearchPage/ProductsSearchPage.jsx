import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { getProductsByQuery } from 'redux/product/product-selectors';
import Container from 'components/Shared/Container/Container';

const ProductsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <section>
      <Container>
        <h1>ProductsSearchPage</h1>
        <p>Search Query Is: {searchQuery}</p>
      </Container>
    </section>
  );
};

export default ProductsSearchPage;
