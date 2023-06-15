export const getProducts = ({ products }) => products.allProducts;
export const getMessage = ({ products }) => products.message;
export const getMyProducts = ({ products }) => products.userProducts;
export const getMyProductsTotal = ({ products }) => products.userTotalProducts;
export const getMyProductsPages = ({ products }) =>
  products.userProductsTotalPages;
export const getProductsByQuery = ({ products }) => products.productsByQuery;
export const getVipProductCard = ({ products }) => products.vipProducts;
export const getVipPages = ({ products }) => products.vipPages;
export const getLoading = ({ products }) => products.loading;
