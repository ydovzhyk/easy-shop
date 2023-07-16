import s from 'components/Shared/RoundButton/RoundButton.module.scss';

const RoundButton = ({
  icon: Icon,
  btnClass = 'roundButton',
  handleClick,
  id,
  onClick }) => {
  const handleButtonClick = (e) => {
    if (handleClick) {
      handleClick(id); // Виклик функції handleClick з передачею id
    }
    if (onClick) {
      onClick(e); // Виклик переданого обробника події onClick
    }
  };

  return (
    <div className={s[btnClass]} onClick={handleButtonClick}>
      <Icon className={s.icon} />
    </div>
  );
};

export default RoundButton;