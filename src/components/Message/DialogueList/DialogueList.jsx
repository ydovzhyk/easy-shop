import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  getAllDialoguesData,
  deleteDialogue,
} from 'redux/dialogue/dialogue-operations';
import {
  getDialoguesArrayStore,
  getDialogueMessage,
} from 'redux/dialogue/dialogue-selectors';
import { getUser } from 'redux/auth/auth-selectors';

import Avatar from 'components/Profile/Avatar/Avatar';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import { BsTrash } from 'react-icons/bs';

import s from './DialogueList.module.scss';

const DialogueList = ({ selectedDialogue, setSelectedDialogue }) => {
  const dispatch = useDispatch();
  const [statusDialogue, setStatusDialogue] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [dialogueId, setDialogueId] = useState(null);
  const [questionWindow, setQuestionWindow] = useState(false);
  const user = useSelector(getUser);
  const [isNewMassege, setIsNewMassege] = useState(null);
  const dialoguesArray = useSelector(getDialoguesArrayStore);
  const message = useSelector(getDialogueMessage);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1279 });

  const onActive = async data => {
    if (data) {
      setStatusDialogue(true);
    } else {
      setStatusDialogue(false);
    }
  };

  useEffect(() => {
    setIsNewMassege(user.newMessage ? user.newMessage : 0);
  }, [user.newMessage]);

  useEffect(() => {
    dispatch(getAllDialoguesData({ statusDialogue }));
  }, [dispatch, statusDialogue, isNewMassege]);

  useEffect(() => {
    if (message) {
      setIsMessage(message);
      dispatch(getAllDialoguesData({ statusDialogue }));
    }
  }, [dispatch, statusDialogue, message]);

  const handleButtonTrashClick = id => {
    setDialogueId(id);
    setQuestionWindow(true);
  };

  const handleConfirm = choice => {
    if (choice === 'yes') {
      dispatch(deleteDialogue({ dialogueId: dialogueId }));
      setQuestionWindow(false);
    } else if (choice === 'no') {
      setDialogueId(null);
      setQuestionWindow(false);
    }
  };

  const resetMessage = () => {
    setIsMessage('');
  };

  const handleDialogueClick = dialogue => {
    setSelectedDialogue(dialogue);
  };

  const getAvatar = ({ otherUserAvatar, productId }) => {
    const myAvatar = user.userAvatar;
    const isMyProduct = user.userProducts.includes(productId);

    if (isMyProduct) {
      return otherUserAvatar;
    } else {
      return myAvatar;
    }
  };

  const getName = ({ otherUserName, productId }) => {
    const myName = user.username;
    const isMyProduct = user.userProducts.includes(productId);
    if (isMyProduct) {
      return otherUserName;
    } else {
      return myName;
    }
  };

  const getNumberNewMessage = dialogue => {
    const newMessageArray = dialogue.newMessages;
    const hasMatchingObject = newMessageArray.filter(obj => {
      return obj.userReceiver === user._id;
    });
    if (hasMatchingObject.length === 0) {
      return 0;
    } else {
      return hasMatchingObject.length;
    }
  };

  return (
    <section className={s.dialogueList}>
      <div className={s.box}>
        <Text
          text={'Ваш список діалогів'}
          textClass={isTabletOrMobile ? 'titleTabMob' : 'title'}
        />
        {isTabletOrMobile && (
          <Text
            text={'Виберіть діалог щоб побачити повідомлення'}
            textClass="productLabelsDialog"
          />
        )}
        <div className={s.btnSelect}>
          <div className={s.wrapper}>
            <Button
              text="Активні"
              type="button"
              handleClick={() => onActive(true)}
              btnClass={
                statusDialogue ? 'exitHeaderBtnDialogue' : 'exitHeaderBtn'
              }
            />
          </div>
          <div className={s.wrapper}>
            <Button
              text="Архівні"
              type="button"
              handleClick={() => onActive(false)}
              btnClass="exitHeaderBtn"
            />
          </div>
        </div>
        {dialoguesArray.length > 0 && (
          <ul className={s.dialogueGroup}>
            {dialoguesArray.map(dialogue => (
              <li
                key={dialogue._id}
                className={s.dialogueCardBotoom}
                onClick={() => handleDialogueClick(dialogue)}
              >
                <div className={s.dialogueCard}>
                  <div className={s.dialogueName}>
                    <Avatar
                      avatarClass="photoDialogue"
                      src={getAvatar({
                        otherUserAvatar: dialogue.otherUserInfo.userAvatar,
                        productId: dialogue.productId,
                      })}
                    />
                    <Text
                      text={getName({
                        otherUserName: dialogue.otherUserInfo.username,
                        productId: dialogue.productId,
                      })}
                      textClass="after-title-bottom"
                    />
                  </div>
                  <div
                    className={s.imageCard}
                    style={{
                      backgroundImage: `url(${dialogue.productInfo.mainPhotoUrl})`,
                    }}
                  ></div>
                  <div className={s.message_title_box}>
                    <div className={s.messageBoxTitle}>
                      <Text
                        text={dialogue.productInfo.nameProduct}
                        textClass="after-title-message-title"
                      />
                    </div>
                    <div className={s.messageBox}>
                      <div className={s.messageBoxText}>
                        <Text
                          text={
                            dialogue.messageArray[
                              dialogue.messageArray.length - 1
                            ].text
                          }
                          textClass="after-title"
                        />
                      </div>
                      <Text
                        text={
                          dialogue.messageArray[
                            dialogue.messageArray.length - 1
                          ].date
                        }
                        textClass="productTextDate"
                      />
                    </div>
                  </div>
                  <div className={s.deleteBox}>
                    <div className={s.numberNewMessage}>
                      <Text
                        text={getNumberNewMessage(dialogue)}
                        textClass="after-title-message-title"
                      />
                    </div>
                    <RoundButton
                      icon={BsTrash}
                      handleClick={handleButtonTrashClick}
                      id={dialogue._id}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {dialoguesArray.length === 0 && (
          <Text
            text={'У вас не має діалогів'}
            textClass="after-title-text-warning"
          />
        )}
      </div>
      {questionWindow && (
        <MessageWindow
          text="Ви впевнені, що хочете видалити діалог?"
          confirmButtons={true}
          onConfirm={handleConfirm}
        />
      )}
      {isMessage && (
        <MessageWindow text={`${isMessage}`} onDismiss={resetMessage} />
      )}
    </section>
  );
};

export default DialogueList;
