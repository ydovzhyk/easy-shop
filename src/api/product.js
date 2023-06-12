import instance from './auth';

export const axiosAddProduct = async productData => {
  const { data } = await instance.post('/product/add', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Delete product by Id
export const axiosDeleteProduct = async userData => {
  const { data } = await instance.delete(`/product/delete/${userData}`);
  return data;
};

export const axiosGetAllProducts = async () => {
  const { data } = await instance.get(`/product/`);
  return data;
};

export const axiosGetUserProducts = async () => {
  const { data } = await instance.get(`/product/user-products`);
  return data;
};

// Get products by Query
export const axiosGetProductsByQuery = async searchQuery => {
  const { data } = await instance.get('/product/search/', {
    params: {
      search: `${searchQuery}`,
    },
  });
  return data;
};
