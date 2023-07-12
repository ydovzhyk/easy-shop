import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDialogue } from 'redux/dialogue/dialogue-operations';
import { getLogin, getUser, getUserAvatar } from 'redux/auth/auth-selectors';
import { getDialogueStore } from 'redux/dialogue/dialogue-selectors';
import { clearDialogue } from 'redux/dialogue/dialogue-slice';
import { getDialogue } from 'redux/dialogue/dialogue-operations';

import { BiMessageDetail } from 'react-icons/bi';
import Text from 'components/Shared/Text/Text';
import Avatar from 'components/Profile/Avatar/Avatar';
import Button from 'components/Shared/Button/Button';

import s from './Dialogue.module.scss';

const Dialogue = ({ productInfo }) => {
  const dispatch = useDispatch();
  const productId = productInfo._id;
  const productOwner = productInfo.owner;

  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);
  const isUserLogin = useSelector(getLogin);
  const [myQuestion, setMyQuestion] = useState('');
  const dialogues = useSelector(getDialogueStore);

  useEffect(() => {
    if (!productId) {
      return;
    }
    dispatch(clearDialogue());
    dispatch(getDialogue({ productId: productId }));
  }, [dispatch, productId]);

  let dialogueArray = [];
  if (dialogues.length === 0) {
    dialogueArray = [];
  } else {
    dialogueArray = dialogues.messageArray.slice().reverse();
  }

  const findAvatar = id => {
    let myAvatar = '';
    let otherAvatar = '';
    const firstAvatar = dialogues.userAvatar;
    const secondAvatar = dialogues.productOwnerAvatar;
    if (user.userAvatar === firstAvatar) {
      myAvatar = firstAvatar;
      otherAvatar = secondAvatar;
    } else {
      myAvatar = secondAvatar;
      otherAvatar = firstAvatar;
    }
    if (id === user._id) {
      return myAvatar;
    } else {
      return otherAvatar;
    }
  };

  const handleQuestionChange = e => {
    setMyQuestion(e.target.value);
  };

  const handleButtonClick = async () => {
    await dispatch(
      createDialogue({
        text: myQuestion,
        productId: productId,
        productOwner: productOwner,
        dialogueId: dialogues._id,
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
      {dialogueArray.length === 0 && (
        <div className={s.avatar}>
          <Avatar avatarClass="photoDialogueLeft" src={userAvatar} />
        </div>
      )}
      {dialogueArray.length > 0 && (
        <ul className={s.dialogueGroup}>
          {dialogueArray.map((dialogue, index) => (
            <li key={index}>
              <div className={s.dialogueBox}>
                {dialogue.textOwner === user._id ? (
                  <>
                    <Avatar
                      avatarClass="photoDialogueLeft"
                      src={findAvatar(dialogue.textOwner)}
                    />
                    <div className={s.dialogueMessage}>
                      <Text
                        text={dialogue.text}
                        textClass="productTextDialogue"
                      />
                      <div className={s.textDate}>
                        <Text
                          text={dialogue.date}
                          textClass="productTextDate"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={s.dialogueMessageRight}>
                      <Text
                        text={dialogue.text}
                        textClass="productTextDialogue"
                      />
                      <div className={s.textDate}>
                        <Text
                          text={dialogue.date}
                          textClass="productTextDate"
                        />
                      </div>
                    </div>
                    <Avatar
                      avatarClass="photoDialogueRight"
                      src={findAvatar(dialogue.textOwner)}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className={s.textInputArea}>
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
