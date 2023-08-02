export const selectAllOrders = ({ orders }) => orders.allOrders;
export const getOrderMessage = ({ orders }) => orders.message;
export const getOrderError = ({ orders }) => orders.error;
export const getLoadingOrders = ({ orders }) => orders.loading;

export const selectUserOrders = ({ orders }) => orders.userOrders.orders;
export const selectUserOrdersTotalPages = ({ orders }) => orders.userOrders.totalPages;
export const selectUserTotalOrders = ({ orders }) =>
  orders.userOrders.totalUserOrders;

export const selectOrderById = ({ orders }) => orders.orderById.order;
export const selectProductsOrderById = ({ orders }) =>
  orders.orderById.orderProductInfo;

export const selectOrderInCheckout = ({ orders }) => orders.orderInCheckout.order;
export const selectProductsOrderInCheckout = ({ orders }) =>
  orders.orderInCheckout.orderProductInfo;

export const selectUserSales = ({ orders }) => orders.userSales.sales;
export const selectUserSalesTotalPages = ({ orders }) => orders.userSales.totalPages;
export const selectUserTotalSales = ({ orders }) => orders.userSales.totalUserSales;  