import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getVerifyEmail } from 'redux/verifyEmail/verifyEmail-selectors';
import { setVerifyEmail } from 'redux/verifyEmail/verifyEmail-slice';
import { field } from 'components/Shared/TextField/fields';
import { verifyEmail } from 'redux/verifyEmail/verifyEmail-operations';
import { getVerifyMessage } from 'redux/verifyEmail/verifyEmail-selectors';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import s from 'components/Profile/EmailVerification/EmailVerification.module.scss';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const receivedEmail = useSelector(getVerifyEmail);
  const isMessage = useSelector(getVerifyMessage);
  const [currentEmail, setCurrentEmail] = useState(receivedEmail);
  const [btnText, setBtnText] = useState('Підтвердити');

  const { control, handleSubmit,
    // reset
  } = useForm({
    defaultValues: {
      email: receivedEmail,
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const emailToSend = data.email !== currentEmail ? data.email : currentEmail;
    dispatch(setVerifyEmail(emailToSend));
    dispatch(verifyEmail(emailToSend));
    setBtnText('Надіслати ще раз');
    // reset();
  };

  const handleEmailChange = (e) => {
    setCurrentEmail(e.target.value);
  };

  return (
    <Container>
      <div className={s.verifyWrapper}>
        <Text
          text={'Підтвердіть свою електронну адресу'}
          textClass="verifyTextTitle"
        />
        <Text text={'Навіщо це потрібно?'} textClass="verifyTextmiddle" />
        <Text
          text={
            "Підтвердіть свою електронну адресу, щоб отримати доступ до додавання оголошень. Це обов'язкова умова для продажу на EASYshop "
          }
          textClass="verifyTextSmall"
        />
        <Text
          text={
            'Ваша електронна адреса не буде доступна іншим користувачам на EASYshop'
          }
          textClass="verifyTextmiddle"
        />
        <Text text={'Як це зробити:'} textClass="verifyTextmiddle" />
        <div className={s.textWrapper}>
          <Text
            text={
              '1.Натисніть на кнопку "Підтвердити". На вашу електронну адресу буде відправлено посилання'
            }
            textClass="verifyTextSmall"
          />
          <Text
            text={
              '2.Перейдіть за посиланням, яке отримали в електронному листі'
            }
            textClass="verifyTextSmall"
          />
        </div>
        <Text
          text={
            'Важливо! Посилання дійсне протягом 10 хвилин з моменту його формування.'
          }
          textClass="verifyAttention"
        />
        <div className={s.formWrapper}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.partFrame}>
              <Text
                text={'Ви можете змінити електронну адресу, яку хочете підтвердити'}
                textClass="verifyAttention"
              />
              <div className={s.phoneWrapper}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <input
                      className={s.changeInput}
                      type="text"
                      value={value}
                      control={control}
                      onChange={(e) => {
                        onChange(e);
                        handleEmailChange(e);
                      }}
                      {...field.email}
                    />
                  )}
                />
                <div className={s.buttonFrame}>
                  <Button text={btnText} btnClass="btnLight" />
                </div>
                
              </div>
            </div>
          </form>
        </div>
      </div>
      {isMessage && <MessageWindow text={isMessage} />}
    </Container>
  );
};

export default EmailVerification;
