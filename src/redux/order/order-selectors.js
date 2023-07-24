export const selectAllOrders = ({ orders }) => orders.allOrders;
export const getOrderMessage = ({ orders }) => orders.message;
export const getOrderError = ({ orders }) => orders.error;
export const getLoadingOrders = ({ orders }) => orders.loading;
export const selectOrderById = ({ orders }) => orders.orderById;
export const selectOrderInCheckout = ({ orders }) => orders.orderInCheckout;
export const selectUserOrders = ({ orders }) => orders.userOrders.orders;
export const selectUserOrdersPage = ({ orders }) => orders.userOrders.totalPages;