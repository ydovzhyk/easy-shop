import instance from './auth';

export const axiosVerifyEmail = async userData => {
  console.log('Це в axiosVerifyEmail', userData);
  const { data } = await instance.post('/verify/', { email: userData });
  return data;
};
