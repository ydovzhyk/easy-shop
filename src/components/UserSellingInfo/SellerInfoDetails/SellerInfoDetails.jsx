import { Suspense, useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, Outlet } from 'react-router-dom';

// import { getUser } from 'redux/auth/auth-selectors';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';
import Loader from 'components/Loader';
import Container from 'components/Shared/Container';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from 'components/UserSellingInfo/SellerInfoDetails/SellerInfoDetails.module.scss';

const SellerInfoDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation().pathname;
    useEffect(() => {
    dispatch(getOtherUser(id));
    }, [dispatch, id]);
    
    const sellerInfo = useSelector(selectOtherUser);
    sellerInfo && console.log('sellerInfo in UserInfoDetails', sellerInfo);

    const [myWares, setMyWares] = useState(0);

   

    const [isMyWares, setIsMyWares] = useState(false);
    const [isMyReviews, setIsMyReviews] = useState(false);
    const [isAbout, setIsAbout] = useState(false);

    useEffect(() => {
        setIsMyWares(
            location === `/member/${id}/` || location === `/member/${id}/mywares` ? true : false
    );
    setIsMyReviews(location === `/member/${id}/myreviews` ? true : false);
    
    setIsAbout(location === `/member/${id}/about` ? true : false);
  }, [location, id]);

  useEffect(() => {
    if (sellerInfo) {
      const sellerWares = sellerInfo.userProducts;
      const sellerWaresLength = sellerWares.length;
      setMyWares(sellerWaresLength);
     
    } else {
      setMyWares(0);
    }
  }, [sellerInfo]);

  console.log('isMyWares:', isMyWares);
  console.log('isMyReviews:', isMyReviews);
  console.log('isAbout:', isAbout);

  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
            <ProfileLink
            to="mywares"
            addValue
            value={myWares}
            isBackgroundChange={isMyWares}
            >
            Мої товари
            </ProfileLink>
        </li>
        
        <li className={s.item}>
            <ProfileLink to="myreviews"
                // addValue
                isBackgroundChange={isMyReviews}
            >
            Мої відгуки
            </ProfileLink>
        </li>
        <li className={s.item}>
            <ProfileLink
            to="about"
            isBackgroundChange={isAbout}
            >
            Про мене
            </ProfileLink>
        </li>
    </ul>
    <Suspense fallback={<Loader />}>
        <Outlet />
    </Suspense>
    </Container>
    );
};

export default SellerInfoDetails;
