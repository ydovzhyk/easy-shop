import instance from './auth';

export const axiosCreateDialogue = async userData => {
  const { data } = await instance.post('/dialogue/create', userData);
  return data;
};

export const axiosGetDialogue = async userData => {
  const { data } = await instance.post('/dialogue/get', userData);
  return data;
};

export const axiosGetDialoguesData = async userData => {
  const { data } = await instance.post('/dialogue/getData', userData);
  return data;
};
