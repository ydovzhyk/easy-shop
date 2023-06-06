import instance from './auth';

// export const axiosAddProduct = async productData => {
//   const { data } = await instance.post('/product/add', productData);
//   return data;
// };

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
