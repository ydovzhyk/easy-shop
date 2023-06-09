import instance from './auth';

export const axiosUpdateUserSettings = async userData => {
  const { data } = await instance.post('/auth/update/settings', userData);
  return data;
};
