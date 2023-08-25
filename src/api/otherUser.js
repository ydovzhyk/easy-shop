import instance from './auth';

// Get Other User info
export const axiosGetOtherUser = async userData => {
  const { data } = await instance.post('/other-user', { userId: userData });
  return data;
};

export const axiosUserSubscriptions = async userData => {
  const { data } = await instance.post(`/other-user/subscriptions`, userData);
  return data;
};

export const axiosDeleteUserSubscriptions = async userData => {
  const { data } = await instance.post(
    `/other-user/subscriptions/delete`,
    userData
  );
  return data;
};

export const axiosSelectedSearches = async userData => {
  const { data } = await instance.post(`/other-user/selected-searches`, userData);
  return data;
};