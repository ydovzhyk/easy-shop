import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDialoguesData } from 'redux/dialogue/dialogue-operations';
import { getDialoguesArrayStore } from 'redux/dialogue/dialogue-selectors';

import Avatar from 'components/Profile/Avatar/Avatar';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import { BsTrash } from 'react-icons/bs';

import s from './DialogueList.module.scss';

const DialogueList = () => {
  const dispatch = useDispatch();
  const [statusDialogue, setStatusDialogue] = useState(true);
  const dialoguesArray = useSelector(getDialoguesArrayStore);
  console.log(dialoguesArray);

  const onActive = async data => {
    if (data) {
      setStatusDialogue(true);
    } else {
      setStatusDialogue(false);
    }
  };

  useEffect(() => {
    dispatch(getAllDialoguesData({ statusDialogue }));
  }, [dispatch, statusDialogue]);

  const handleButtonTrashClick = id => {};

  return (
    <section className={s.dialogueList}>
      <div className={s.box}>
        <Text text={'Ваш список діалогів'} textClass="title" />
        <div className={s.btnSelect}>
          <div className={s.wrapper}>
            <Button
              text="Активні"
              type="button"
              handleClick={() => onActive(true)}
              btnClass="exitHeaderBtn"
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
              <li key={dialogue._id} className={s.dialogueCardBotoom}>
                <div className={s.dialogueCard}>
                  <div className={s.dialogueName}>
                    <Avatar
                      avatarClass="photoDialogue"
                      src={dialogue.otherUserInfo.userAvatar}
                    />
                    <Text
                      text={dialogue.otherUserInfo.username}
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
          <Text text={'У вас не має діалогів'} textClass="after-title-bottom" />
        )}
      </div>
    </section>
  );
};

export default DialogueList;
