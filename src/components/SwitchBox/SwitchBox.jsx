import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import Changer from 'components/Shared/Changer/Changer';
import s from './SwitchBox.module.scss';

const SwitchBox = ({ type }) => {
  return (
    <div className={s.switchBtnBox}>
      <Changer type={type} />
      <SwitchBtn />
    </div>
  );
};

export default SwitchBox;
