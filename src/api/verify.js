import instance from './auth';

export const axiosVerifyEmail = async userData => {
  const { data } = await instance.post('/verify/', { email: userData });
  return data;
};
