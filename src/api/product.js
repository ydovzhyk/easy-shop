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

export const axiosGetUserProducts = async userData => {
  const { data } = await instance.get(
    `/product/user-products?page=${userData}`
  );
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

//Get vipProducts page
export const axiosGetVipProducts = async userData => {
  const { data } = await instance.get(`/product/vip?page=${userData}`);
  return data;
};

export const axiosProductsBySelector = async userData => {
  console.log(userData);
  const { data } = await instance.get(
    `/product/selector?page=${userData.page}&selectorName=${userData.selectorName}`
  );
  return data;
};

export const axiosGetProductById = async id => {
  const { data } = await instance.get(`/product/${id}`);
  return data;
};