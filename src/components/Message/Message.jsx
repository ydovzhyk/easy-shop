import { useState } from 'react';

import DialogueDetail from './DialogueDetail/DialogueDetail';
import Container from 'components/Shared/Container';
import DialogueList from './DialogueList/DialogueList';

import s from './Message.module.scss';

const Message = () => {
  const [selectedDialogue, setSelectedDialogue] = useState(null);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.dialogueGroup}>
          <DialogueList
            selectedDialogue={selectedDialogue}
            setSelectedDialogue={setSelectedDialogue}
          />

          <DialogueDetail selectedDialogue={selectedDialogue} />
        </div>
      </Container>
    </section>
  );
};

export default Message;
