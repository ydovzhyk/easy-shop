import instance from './auth';

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
