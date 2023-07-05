// import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { searchProducts } from 'redux/product/product-operations';
// import { getProductsByQuery } from 'redux/product/product-selectors';
import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';

const ProductsSearchPage = () => {
  // const [searchParams] = useSearchParams();
  // const searchQuery = searchParams.get('search') ?? '';
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (searchQuery === '') {
  //     return;
  //   }
  //   dispatch(searchProducts(searchQuery));
  // }, [searchQuery, dispatch]);

  return (
    <div>
      <Container>
        <div
          style={{
            display: 'flex',
            padding: '20px 0',
          }}
        >
          <Filter />
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default ProductsSearchPage;
