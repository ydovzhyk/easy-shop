import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/auth/auth-opetations';

const UserUpdateComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
    if (authData && authData.accessToken) {
      const userData = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        sid: authData.sid,
      };
      dispatch(updateUser(userData));
    }
  }, [dispatch]);

  return null;
};

export default UserUpdateComponent;
