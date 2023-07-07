import instance from './auth';

// Create new product
export const axiosAddProduct = async productData => {
  const { data } = await instance.post('/product/add', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Update product
export const axiosUpdateProduct = async productData => {
  const { data } = await instance.post('/product/update', productData, {
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

// Get User products
export const axiosGetUserProducts = async userData => {
  const { data } = await instance.get(
    `/product/user-products?page=${userData}`
  );
  return data;
};

// Get products by Query
export const axiosGetProductsByQuery = async payloadData => {
  const { data } = await instance.get('/product/search/', {
    params: payloadData,
  });
  return data;
};

// Get vipProducts page
export const axiosGetVipProducts = async userData => {
  const { data } = await instance.get(`/product/vip?page=${userData}`);
  return data;
};

// Get products by Selector
export const axiosProductsBySelector = async userData => {
  const { data } = await instance.get(
    `/product/selector?page=${userData.page}&selectorName=${userData.selectorName}`
  );
  return data;
};

// Get product by Id
export const axiosGetProductById = async id => {
  const { data } = await instance.get(`/product/${id}`);
  return data;
};

// Get products from user's basket
export const axiosGetProductsFromBasket = async id => {
  const { data } = await instance.get(`/product/basket/${id}`);
  return data;
};
