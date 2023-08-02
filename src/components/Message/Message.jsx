import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import { Link } from 'react-router-dom';

import Container from 'components/Shared/Container';
import DialogueList from './DialogueList/DialogueList';
import DialogueDetail from './DialogueDetail/DialogueDetail';
import { BsArrowLeft } from 'react-icons/bs';

import s from './Message.module.scss';
// import { Button } from 'antd';

const Message = () => {
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const handleClose = () => {
    setSelectedDialogue(null);
  };

  return (
    <section className={s.section}>
      <Container>
        <div className={s.dialogueGroup}>
          <DialogueList
            selectedDialogue={selectedDialogue}
            setSelectedDialogue={setSelectedDialogue}
          />

          {isDesktop && (
            <div className={s.containerDialogueDetailDesktop}>
              <DialogueDetail
                selectedDialogue={selectedDialogue}
                setSelectedDialogue={setSelectedDialogue}
              />
            </div>
          )}
          {!isDesktop && selectedDialogue !== null && (
            <div className={s.containerDialogueDetailTabMob}>
              <div className={s.buttonBox}>
                <button className={s.dismissButton} onClick={handleClose}>
                  <BsArrowLeft className={s.buttonBack} />
                </button>
              </div>
              <DialogueDetail
                selectedDialogue={selectedDialogue}
                setSelectedDialogue={setSelectedDialogue}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Message;

// <Button
//   type="button"
//   btnClass="burgerButton"
//   handleClick={handleSearchBtnClick}
//   text={<AiOutlineArrowLeft size={isMobile ? 15 : 20} />}
// />;
