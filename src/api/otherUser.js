import instance from './auth';

// Get Other User info
export const axiosGetOtherUser = async userData => {
  const { data } = await instance.post('/other-user', { userId: userData });
  return data;
};

export const axiosUserSubscriptions = async userData => {
  // const { data } = await instance.post(`/other-user/subscriptions?page=${userData}`, userData);
  const { data } = await instance.post(`/other-user/subscriptions`);
  return data;
};


export const axiosDeleteUserSubscriptions = async userData => {
  const { data } = await instance.post(`/other-user/subscriptions/delete`);
  return data;
};
