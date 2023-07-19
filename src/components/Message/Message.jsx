import Container from 'components/Shared/Container';
import DialogueList from './DialogueList/DialogueList';

import s from './Message.module.scss';
import DialogueDetail from './DialogueDetail/DialogueDetail';

const Message = () => {
  return (
    <section className={s.auth}>
      <Container>
        <div className={s.box}>
          <DialogueList />
          <DialogueDetail />
        </div>
      </Container>
    </section>
  );
};

export default Message;
