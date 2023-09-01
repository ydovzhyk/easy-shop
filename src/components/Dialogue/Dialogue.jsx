import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDialogue } from 'redux/dialogue/dialogue-operations';
import { getLogin, getUser, getUserAvatar } from 'redux/auth/auth-selectors';
import {
  getDialogueStore,
  getDialoguesArrayStoreNew,
  getIsNewMessage,
} from 'redux/dialogue/dialogue-selectors';
import {
  clearDialogue,
  changeStatusIsNewMessage,
  updateDialoguesArray,
  updateDialogueStore,
} from 'redux/dialogue/dialogue-slice';

import {
  getDialogue,
  deleteDialogueNewMessage,
} from 'redux/dialogue/dialogue-operations';

// import { BiMessageDetail } from 'react-icons/bi';
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
  const customerId = productInfo.customer;
  const sellerId = productInfo.seller;

  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);
  const isUserLogin = useSelector(getLogin);
  const dialoguesArray = useSelector(getDialoguesArrayStoreNew);
  const isNewMessage = useSelector(getIsNewMessage);

  const [myQuestion, setMyQuestion] = useState('');
  const [isShowComponent, setIsShowComponent] = useState(false);
  const [isProductId, setIsProductId] = useState(null);
  const [isCustomerId, setIsCustomerId] = useState(null);
  const [isSellerId, setIsSellerId] = useState(null);
  const isDeleteInProgressRef = useRef(false);
  const dialogueStore = useSelector(getDialogueStore);

  let dialogueArray = [];
  let newMessageArray = [];
  let isInfoDialogue = false;

  useEffect(() => {
    if (productId && !customerId && !sellerId) {
      setIsProductId(productId);
    }
    if (productId && customerId) {
      setIsProductId(productId);
      setIsCustomerId(customerId);
    }
    if (productId && sellerId) {
      setIsProductId(productId);
      setIsSellerId(sellerId);
    } else {
      return;
    }
  }, [productId, customerId, sellerId]);

  useEffect(() => {
    if (dialoguesArray.length > 0 && !isNewMessage) {
      const changedDialogues = dialoguesArray.filter(dialogue => {
        const newMessageArray = dialogue.newMessages;
        return newMessageArray.some(obj => obj.userReceiver === user._id);
      });

      let currentDialogue = dialogueStore._id
        ? dialogueStore._id
        : selectedDialogueId;
      const isChanged = changedDialogues.some(
        dialogue => dialogue._id === currentDialogue
      );
      if (isChanged) {
        dispatch(changeStatusIsNewMessage(true));
        dispatch(updateDialoguesArray(currentDialogue));
      } else {
        return;
      }
    } else {
      return;
    }
  }, [
    dispatch,
    dialoguesArray,
    user._id,
    dialogueStore._id,
    selectedDialogueId,
    isNewMessage,
  ]);

  useEffect(() => {
    const getDialogueNew = async () => {
      isDeleteInProgressRef.current = false;
      setIsShowComponent(false);
      dispatch(clearDialogue());
      dispatch(changeStatusIsNewMessage(false));
      if (!isProductId || !isUserLogin || selectedDialogueId) {
        return;
      }
      await dispatch(
        getDialogue({
          productId: isProductId,
          customerId: isCustomerId,
          sellerId: isSellerId,
        })
      );
      setIsShowComponent(true);
    };
    getDialogueNew();
  }, [
    dispatch,
    isProductId,
    selectedDialogueId,
    isUserLogin,
    isNewMessage,
    isCustomerId,
    isSellerId,
  ]);

  useEffect(() => {
    const getDialogueNew = async () => {
      isDeleteInProgressRef.current = false;
      setIsShowComponent(false);
      dispatch(clearDialogue());
      dispatch(changeStatusIsNewMessage(false));
      if (!selectedDialogueId) {
        return;
      }
      await dispatch(getDialogue({ dialogueId: selectedDialogueId }));

      setIsShowComponent(true);
    };
    getDialogueNew();
  }, [dispatch, selectedDialogueId, isNewMessage]);

  useEffect(() => {
    const checkIsNewMessageCurrentUser = data => {
      const result = data.some(item => item.userReceiver === user._id);
      return result;
    };
    if (dialogueStore.length === 0) {
      return;
    }
    if (
      isDeleteInProgressRef.current ||
      dialogueStore.newMessages.length === 0 ||
      !checkIsNewMessageCurrentUser(dialogueStore.newMessages)
    ) {
      return;
    } else {
      const currentDialogue = dialogueStore._id;
      const newMessageArray = dialogueStore.newMessages;
      const userId = user._id;
      const userNewMessage = newMessageArray.filter(
        messageObj => messageObj.userReceiver === userId
      );

      const deleteNewMessageCallback = async () => {
        if (isDeleteInProgressRef.current) {
          return;
        }
        isDeleteInProgressRef.current = true;
        await dispatch(
          deleteDialogueNewMessage({
            dialogueId: currentDialogue,
            arrayNewMessage: userNewMessage,
          })
        );
        await dispatch(updateDialogueStore(currentDialogue));
      };

      const timer = setTimeout(deleteNewMessageCallback, 20000);
      return () => {
        clearTimeout(timer);
        deleteNewMessageCallback();
      };
    }
  }, [dispatch, dialogueStore, user._id]);

  const isInfo = dialogueArray => {
    if (dialogueArray[0].textOwner === '64cccb7e5b8c2eb706fe655d') {
      isInfoDialogue = true;
    } else {
      isInfoDialogue = false;
    }
  };

  if (dialogueStore.length === 0) {
    dialogueArray = [];
    newMessageArray = [];
  } else {
    dialogueArray = dialogueStore.messageArray.slice().reverse();
    newMessageArray = dialogueStore.newMessages;
    isInfo(dialogueArray);
  }

  const findAvatar = id => {
    let myAvatar = '';
    let otherAvatar = '';
    const firstAvatar = dialogueStore.userAvatar;
    const secondAvatar = dialogueStore.productOwnerAvatar;
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
          productId: isProductId,
          productOwner: productOwner,
          dialogueId: dialogueStore._id,
          customerId: isCustomerId,
          sellerId: isSellerId,
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
    <>
      {isShowComponent && (
        <div className={s.dialogueContainer}>
          {!isInfoDialogue && (
            <div className={s.additionalOpts}>
              {/* <BiMessageDetail className={s.favoriteIcon} /> */}
              {!isCustomerId && !isSellerId && (
                <Text text="Написати повідомлення" textClass="productText" />
              )}
              {isCustomerId && !isSellerId && (
                <Text text="Запитати покупця" textClass="productText" />
              )}
              {isSellerId && !isCustomerId && (
                <Text text="Запитати продавця" textClass="productText" />
              )}
            </div>
          )}
          {dialogueArray.length === 0 && (
            <div className={s.avatar}>
              <Avatar avatarClass="photoDialogueLeft" src={userAvatar} />
            </div>
          )}
          {dialogueArray.length > 0 && (
            <ul
              className={
                isCustomerId || isSellerId
                  ? s.dialogueGroupCustomer
                  : s.dialogueGroup
              }
            >
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
          {!isInfoDialogue && (
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
          )}
        </div>
      )}
    </>
  );
};

export default Dialogue;
