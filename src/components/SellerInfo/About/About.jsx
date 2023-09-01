import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import s from 'components/SellerInfo/About/About.module.scss'

const About = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const sellerInfo = useSelector(selectOtherUser);
  const aboutSeller = sellerInfo.about;
  const name = sellerInfo.username;

  useEffect(() => {
    dispatch( getOtherUser(id));
  }, [dispatch, id]);
  
    return (
        <p className={s.message}> {aboutSeller ? aboutSeller : `Користувач ${name} нічого не повідомив про себе`}</p>
    )
}

export default About
  ;