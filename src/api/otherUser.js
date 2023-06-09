import instance from './auth';

// Get Other User info
export const axiosGetOtherUser = async userData => {
  const { data } = await instance.post('/other-user', { userId: userData });
  return data;
};
