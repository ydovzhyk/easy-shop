import s from 'components/Shared/RoundButton/RoundButton.module.scss';

const RoundButton = ({
    icon: Icon,
    btnClass='roundButton',
    handleClick }) => {
    return (
        <div
            // className={s.roundButton}
            className={s[btnClass]}
            onClick={handleClick}
        >
            <Icon className={s.icon } />
    </div>
  );
}

export default RoundButton;