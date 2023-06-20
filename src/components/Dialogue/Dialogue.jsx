// import Container from 'components/Shared/Container/Container';
import { BiMessageDetail } from 'react-icons/bi';
import Text from 'components/Shared/Text/Text';
import Avatar from 'components/Profile/Avatar/Avatar';
import Button from 'components/Shared/Button/Button';


import s from './Dialogue.module.scss';

const Dialogue = () => {
  return (
    <div className={s.dialogueContainer}>
      <div className={s.additionalOpts}>
        <BiMessageDetail className={s.favoriteIcon} />
        <Text text="Поставити запитання" textClass="productText" />
      </div>
      <div className={s.avatar}>
        <Avatar avatarClass="photoAvatar" />
      </div>
      <textarea></textarea>
      <div className={s.questionButton}>
        <Button type="button" text="Увійти, щоб запитати продавця" />
      </div>
    </div>
  );
};

export default Dialogue;
