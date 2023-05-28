import { useState } from 'react';
import s from './SwitchBtn.module.scss';

const SwitchBtn = () => {
  const [stateSwitch, setStateSwitch] = useState(false);
  const handleClick = () => {
    setStateSwitch(!stateSwitch);
  };
  const getClassName = () => {
    return stateSwitch ? `${s.switchBtn} ${s.switchOn}` : s.switchBtn;
  };
  return <div className={getClassName()} onClick={handleClick}></div>;
};

export default SwitchBtn;
