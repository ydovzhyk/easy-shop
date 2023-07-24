export const selectAllProducts = ({ products }) => products.allProducts;
export const getMessage = ({ products }) => products.message;
export const getProductError = ({ products }) => products.error;
export const getMyProducts = ({ products }) => products.userProducts;
export const getMyProductsTotal = ({ products }) => products.userTotalProducts;
export const getMyProductsPages = ({ products }) =>
  products.userProductsTotalPages;
export const getProductsByQuery = ({ products }) => products.productsByQuery;
export const getCurrentProductsPage = ({ products }) =>
  products.currentProductsPage;
export const getHeaderFormReset = ({ products }) => products.headerFormReset;
export const getHeaderFormClick = ({ products }) => products.headerFormClick;
export const getFilterProduct = ({ products }) => products.filterProduct;
export const getFilterForm = ({ products }) => products.filterFormSubmit;
export const getHeaderFormErrors = ({ products }) => products.headerFormErrors;
export const getVipProductCard = ({ products }) => products.vipProducts;
export const getVipPages = ({ products }) => products.vipPages;
export const getLoadingProducts = ({ products }) => products.loading;
export const getProductsBySelectorCard = ({ products }) =>
  products.selectorProducts;
export const getSelectorPages = ({ products }) => products.selectorPages;
export const selectProductById = ({ products }) => products.productById;

export const selectProductsFromBasket = ({ products }) =>
  products.productsFromBasket;

export const selectSellersFromBasket = ({ products }) =>
  products.sellersFromBasket;
