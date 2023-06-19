import s from 'components/Shared/RoundButton/RoundButton.module.scss';

const RoundButton = ({
  icon: Icon,
  btnClass = 'roundButton',
  handleClick,
  id,
}) => {
  return (
    <div className={s[btnClass]} onClick={() => handleClick(id)}>
      <Icon className={s.icon} />
    </div>
  );
};

export default RoundButton;
