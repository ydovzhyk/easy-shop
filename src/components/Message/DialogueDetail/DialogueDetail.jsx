// import Text from 'components/Shared/Text/Text';
// import Button from 'components/Shared/Button';
// import Dialogue from 'components/Dialogue/Dialogue';

import s from './DialogueDetail.module.scss';

const DialogueDetail = () => {
  return (
    <section className={s.dialogueDetail}>
      <div className={s.box}>
        {/* <Text text={'Ваш список діалогів'} textClass="after-title" /> */}
        {/* <Dialogue productInfo={{ _id, owner, userDialogue }} /> */}
      </div>
    </section>
  );
};

export default DialogueDetail;
