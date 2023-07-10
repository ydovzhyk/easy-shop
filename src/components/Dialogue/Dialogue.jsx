import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDialogue } from 'redux/dialogue/dialogue-operations';
import { getLogin } from 'redux/auth/auth-selectors';
import { getID } from 'redux/auth/auth-selectors';

import { getUserAvatar } from 'redux/auth/auth-selectors';
import { BiMessageDetail } from 'react-icons/bi';
import Text from 'components/Shared/Text/Text';
import Avatar from 'components/Profile/Avatar/Avatar';
import Button from 'components/Shared/Button/Button';

import s from './Dialogue.module.scss';

const Dialogue = ({ productInfo }) => {
  const dispatch = useDispatch();
  const productId = productInfo._id;
  const productOwner = productInfo.owner;
  const [myQuestion, setMyQuestion] = useState('');
  const userAvatar = useSelector(getUserAvatar);
  const owner = useSelector(getID);
  const isUserLogin = useSelector(getLogin);

  const handleQuestionChange = e => {
    setMyQuestion(e.target.value);
  };

  const handleButtonClick = async () => {
    console.log('Відправка питання', myQuestion);
    await dispatch(
      createDialogue({
        text: myQuestion,
        owner: owner,
        productId: productId,
        productOwner: productOwner,
      })
    );
    setMyQuestion('');
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
      <ul>
        <li></li>
      </ul>
      <div>
        <textarea
          className={s.textarea}
          name="myQuestion"
          value={myQuestion}
          onChange={handleQuestionChange}
          rows={5}
          cols={40}
        />
        <div className={s.questionButton}>
          <Button
            text={isUserLogin ? 'Надіслати' : 'Авторизуйтеся'}
            btnClass="btnLight"
            handleClick={handleButtonClick}
          />

          {!isUserLogin && (
            <Text
              text="*Щоб написати продавцю, увійдіть в обліковий запис або зареєструйтеся"
              textClass="messageTextBtn"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
