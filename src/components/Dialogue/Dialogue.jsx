// import Container from 'components/Shared/Container/Container';
import { getLogin } from 'redux/auth/auth-selectors';

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
  const isUserLogin = useSelector(getLogin);

  console.log(userId, productById);

  console.log('User avatar');

  return (
    <div className={s.dialogueContainer}>
      <div className={s.additionalOpts}>
        <BiMessageDetail className={s.favoriteIcon} />
        <Text text="Поставити запитання" textClass="productText" />
      </div>
      <div className={s.avatar}>
        <Avatar avatarClass="photoDialog" src={userAvatar} />
      </div>
      <ul>
        <li></li>
      </ul>
      <textarea className={s.textarea} rows={5} cols={40} />
      <div className={s.questionButton}>
        <Button
          type="button"
          text={isUserLogin ? 'Надіслати' : 'Авторизуйтеся'}
          btnClass="btnLight"
          // handleClick={questionRequest}
        />
        {!isUserLogin && (
          <Text
            text="*Щоб написати продавцю, увійдіть в обліковий запис або зареєструйтеся"
            textClass="messageTextBtn"
          />
        )}
      </div>
    </div>
  );
};

export default Dialogue;
