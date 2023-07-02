import { useState } from 'react';
import Changer from 'components/Shared/Changer/Changer';

import s from './SwitchBtn.module.scss';

const SwitchBtn = ({ type, onChange }) => {
  const [stateSwitch, setStateSwitch] = useState(false);
  const handleClick = () => {
    const newState = !stateSwitch;
    setStateSwitch(newState);
    onChange(newState);
  };
  const getClassName = () => {
    return stateSwitch ? `${s.switchBtn} ${s.switchOn}` : s.switchBtn;
  };
  return (
    <div className={getClassName()} onClick={handleClick}>
      <Changer type={type} />
    </div>
  );
};

export default SwitchBtn;