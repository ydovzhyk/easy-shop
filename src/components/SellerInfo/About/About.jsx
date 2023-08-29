import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

const About = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch( getOtherUser(id));
  }, [dispatch, id]);
  
  const sellerInfo = useSelector(selectOtherUser);
  const aboutSeller = sellerInfo.about;
  console.log('aboutSeller in about:', aboutSeller);
    return (
        <div> {aboutSeller ? aboutSeller : "Продавець нічого не повідомив про себе"}</div>
    )
}

export default About
  ;