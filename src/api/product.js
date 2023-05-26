import instance from './auth';

// Add product
// export const axiosAddProduct = async userData => {
//   const { data } = await instance.post('/product/add', userData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return data;
// };

// export const axiosAddProduct = async userData => {
//   const { data } = await instance.post('/product/add', userData);
//   return data;
// };

export const axiosAddProduct = async userData => {
  try {
    const uploadPromise = instance.post('/product/add', userData.files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const updatePromise = instance.post('/product/add', userData.data);

    const [updateResponse] = await Promise.all([uploadPromise, updatePromise]);

    console.log('Update Response:', updateResponse.data);
    return {
      updateResult: updateResponse.data,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Delete product by Id
export const axiosDeleteProduct = async userData => {
  const { data } = await instance.delete(`/product/delete/${userData}`);
  return data;
};
