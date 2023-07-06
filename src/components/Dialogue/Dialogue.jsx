// import Container from 'components/Shared/Container/Container';
import { getUserAvatar } from 'redux/auth/auth-selectors';
import { BiMessageDetail } from 'react-icons/bi';
import Text from 'components/Shared/Text/Text';
import Avatar from 'components/Profile/Avatar/Avatar';
import Button from 'components/Shared/Button/Button';

import {
  // useDispatch,
  useSelector,
} from 'react-redux';

import { getID } from 'redux/auth/auth-selectors';
import { selectProductById } from 'redux/product/product-selectors';

import s from './Dialogue.module.scss';

const Dialogue = () => {
  const userId = useSelector(getID);
  const productById = useSelector(selectProductById);
  const userAvatar = useSelector(getUserAvatar);

  console.log('User avatar');

  const questionRequest = () => {
    console.log('userId:', userId);
    console.log('productById:', productById);
    console.log('productOner:', productById.owner);
    console.log('productId:', productById._id);
  };

  return (
    <div className={s.dialogueContainer}>
      <div className={s.additionalOpts}>
        <BiMessageDetail className={s.favoriteIcon} />
        <Text text="Поставити запитання" textClass="productText" />
      </div>
      <div className={s.avatar}>
        <Avatar avatarClass="photoDialog" src={userAvatar} />
      </div>
      <textarea></textarea>
      <div className={s.questionButton}>
        <Button
          type="button"
          text="Увійти, щоб запитати продавця"
          handleClick={questionRequest}
        />
      </div>
    </div>
  );
};

export default Dialogue;
