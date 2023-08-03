import s from 'components/Shared/RoundButton/RoundButton.module.scss';

const RoundButton = ({ icon: Icon, btnClass, handleClick, id, onClick }) => {
  const handleButtonClick = e => {
    if (handleClick) {
      handleClick(id);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClassName = btnClass ? btnClass : 'roundButton';
  const iconClassName = btnClass === 'roundButtonMob' ? 'iconMob' : 'icon';

  return (
    <div className={s[buttonClassName]} onClick={handleButtonClick}>
      <Icon className={s[iconClassName]} />
    </div>
  );
};

export default RoundButton;
