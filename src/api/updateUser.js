import instance from './auth';

export const axiosUpdateUserSettings = async userData => {
  console.log(userData);
  const { data } = await instance.post('/auth/current/settings', userData);
  return data;
};
