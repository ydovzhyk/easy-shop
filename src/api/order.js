import instance from './auth';

// Create new order
export const axiosAddOrder = async orderData => {
  const { data } = await instance.post('/orders/', orderData);
  return data;
};

// Update order
export const axiosUpdateOrder = async orderData => {
  const { data } = await instance.post('/orders/', orderData);
  return data;
};

export const axiosGetAllOrders = async () => {
  const { data } = await instance.get(`/orders/`);
  return data;
};

// Get order by Id
export const axiosGetOrderById = async id => {
  const { data } = await instance.get(`/order/${id}`);
  return data;
};
