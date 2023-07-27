export const selectAllOrders = ({ orders }) => orders.allOrders;
export const getOrderMessage = ({ orders }) => orders.message;
export const getOrderError = ({ orders }) => orders.error;
export const getLoadingOrders = ({ orders }) => orders.loading;
export const selectOrderById = ({ orders }) => orders.orderById.order;
export const selectOrderInCheckout = ({ orders }) => orders.orderInCheckout.orders;
export const selectUserOrders = ({ orders }) => orders.userOrders.orders;
export const selectUserOrdersTotalPages = ({ orders }) => orders.userOrders.totalPages;
export const selectUserTotalOrders = ({ orders }) =>
  orders.userOrders.totalUserOrders;
export const selectProductsOrderById = ({ orders }) => orders.orderById;
export const selectProductsOrderInCheckout = ({ orders }) => orders.orderInCheckout;