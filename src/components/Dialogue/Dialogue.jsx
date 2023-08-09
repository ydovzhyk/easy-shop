import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDialogue } from 'redux/dialogue/dialogue-operations';
import { getLogin, getUser, getUserAvatar } from 'redux/auth/auth-selectors';
import { getDialogueStore } from 'redux/dialogue/dialogue-selectors';
import { clearDialogue } from 'redux/dialogue/dialogue-slice';
import {
  getDialogue,
  deleteDialogueNewMessage,
} from 'redux/dialogue/dialogue-operations';

import { BiMessageDetail } from 'react-icons/bi';
import Text from 'components/Shared/Text/Text';
import Avatar from 'components/Profile/Avatar/Avatar';
import Button from 'components/Shared/Button/Button';

import s from './Dialogue.module.scss';

const Dialogue = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = productInfo._id;
  const productOwner = productInfo.owner;
  const selectedDialogueId = productInfo.userDialogue;

  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);
  const isUserLogin = useSelector(getLogin);

  const [myQuestion, setMyQuestion] = useState('');
  const [isNewMassege, setIsNewMassege] = useState(null);
  const dialogues = useSelector(getDialogueStore);

  useEffect(() => {
    setIsNewMassege(user.newMessage ? user.newMessage : 0);
  }, [user.newMessage]);

  //Коли ми в ProductCard
  useEffect(() => {
    dispatch(clearDialogue());
    if (!productId || !isUserLogin) {
      return;
    }
    if (selectedDialogueId) {
      return;
    }
    dispatch(getDialogue({ productId: productId }));
  }, [dispatch, productId, selectedDialogueId, isUserLogin]);

  useEffect(() => {
    dispatch(clearDialogue());
    if (!selectedDialogueId) {
      return;
    }
    dispatch(getDialogue({ dialogueId: selectedDialogueId }));
  }, [dispatch, selectedDialogueId, isNewMassege]);

  useEffect(() => {
    if (!dialogues || dialogues.length === 0) {
      return;
    } else {
      const dialogueId = dialogues._id;
      const newMessageArray = dialogues.newMessages;
      const userId = user._id;
      const isUserNewMessage = newMessageArray.filter(
        messageObj => messageObj.userReceiver === userId
      );
      if (!isUserNewMessage || isUserNewMessage.length === 0) {
        return;
      } else {
        const deleteNewMessageCallback = () => {
          dispatch(
            deleteDialogueNewMessage({
              dialogueId: dialogueId,
              arrayNewMessage: isUserNewMessage,
            })
          );
        };

        const timer = setTimeout(deleteNewMessageCallback, 5000);
        return () => {
          clearTimeout(timer);
          deleteNewMessageCallback();
        };
      }
    }
  }, [dispatch, dialogues, user._id]);

  let dialogueArray = [];
  let newMessageArray = [];
  if (dialogues.length === 0) {
    dialogueArray = [];
    newMessageArray = [];
  } else {
    dialogueArray = dialogues.messageArray.slice().reverse();
    newMessageArray = dialogues.newMessages;
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

  const handleButtonClick = async isUserLogin => {
    if (isUserLogin) {
      await dispatch(
        createDialogue({
          text: myQuestion,
          productId: productId,
          productOwner: productOwner,
          dialogueId: dialogues._id,
        })
      );
      setMyQuestion('');
    } else {
      navigate('/login');
      return;
    }
  };

  const isMessageNew = (text, date) => {
    if (!newMessageArray || newMessageArray.length === 0) {
      return false;
    }
    const userId = user._id;
    const isNewMessageArray = newMessageArray.filter(
      messageObj =>
        messageObj.userReceiver === userId &&
        messageObj.message === text &&
        messageObj.date === date
    );

    if (isNewMessageArray.length === 0) {
      return false;
    } else {
      return true;
    }
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
                        textClass={
                          isMessageNew(dialogue.text, dialogue.date)
                            ? 'productTextDialogueNewMessage'
                            : 'productTextDialogue'
                        }
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
                        textClass={
                          isMessageNew(dialogue.text, dialogue.date)
                            ? 'productTextDialogueNewMessage'
                            : 'productTextDialogue'
                        }
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
            handleClick={() => handleButtonClick(isUserLogin)}
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
