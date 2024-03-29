import instance from './auth';

// Create new order
export const axiosAddOrder = async orderData => {
  const { data } = await instance.post('/orders/add', orderData);
  return data;
};

// Update order
export const axiosUpdateOrder = async (orderData) => {
  const { data } = await instance.post(`/orders/update`, orderData);
  return data;
};

export const axiosGetAllOrders = async () => {
  const { data } = await instance.get(`/orders/`);
  return data;
};

// Get order by Id
export const axiosGetOrderById = async id => {
  const { data } = await instance.get(`/orders/${id}`);
  return data;
};

// Delete orderby Id
export const axiosDeleteOrderById = async userData => {
  const { data } = await instance.delete(`/orders/delete/${userData}`);
  return data;
};

// Get User Orders
export const axiosGetUserOrders = async userData => {
  const { data } = await instance.post(
    `/orders/user-orders?page=${userData.page}&selectorName=${userData.selectorName}`
  );
  return data;
};

// Get User Sales
export const axiosGetUserSales = async userData => {
  const { data } = await instance.post(
    `/orders/user-sales?page=${userData.page}&selectorName=${userData.selectorName}`
  );
  return data;
};

// Update orderStatus
export const axiosUpdateOrderStatus = async orderData => {
  const { data } = await instance.post(`/orders/confirmation`, orderData);
  return data;
};