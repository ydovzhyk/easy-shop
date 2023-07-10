import instance from './auth';

export const axiosCreateDialogue = async userData => {
  const { data } = await instance.post('/dialogue/create', userData);
  return data;
};
