import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Container from 'components/Shared/Container';
import DialogueList from './DialogueList/DialogueList';
import DialogueDetail from './DialogueDetail/DialogueDetail';
import { FiX } from 'react-icons/fi';

import s from './Message.module.scss';

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
              <Container>
                <div className={s.buttonBoxPosition}>
                  <div className={s.buttonBox}>
                    <button className={s.closeButton} onClick={handleClose}>
                      <FiX />
                    </button>
                  </div>
                </div>
                <DialogueDetail
                  selectedDialogue={selectedDialogue}
                  setSelectedDialogue={setSelectedDialogue}
                />
              </Container>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Message;
