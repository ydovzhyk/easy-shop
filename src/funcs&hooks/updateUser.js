import { updateUser } from 'redux/auth/auth-operations';

export const updateUserFunc = dispatch => {
  const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
  if (authData && authData.accessToken) {
    const userData = {
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
      sid: authData.sid,
    };
    dispatch(updateUser(userData));
  }
};
