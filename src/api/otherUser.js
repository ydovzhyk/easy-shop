import instance from './auth';

// Get Other User info
export const axiosGetOtherUser = async userData => {
  const { data } = await instance.post('/other-user', { userId: userData });
  return data;
};

export const axiosUserSubscriptions = async () => {
  const { data } = await instance.post('/other-user/subscriptions');
  return data;
};

export const axiosUserFollowers = async () => {
  const { data } = await instance.post('/other-user/followers');
  return data;
};
