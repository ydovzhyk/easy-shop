import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { updateUserSettings } from 'redux/auth/auth-opetations';
import { field } from 'components/Shared/TextField/fields';
import { getUser, getUserMessage} from 'redux/auth/auth-selectors';
import { getUserAvatar } from 'redux/auth/auth-selectors';
import { updateUser } from 'redux/auth/auth-opetations';
import { setVerifiEmail } from 'redux/verifiEmail/verifiEmail-slice';
import Container from 'components/Shared/Container';
import ChangePhoto from 'components/Profile/ChangePhoto/ChangePhoto';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import TextField from 'components/Shared/TextField/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import { CityNames } from './Options';


import s from './MySettings.module.scss';

const MySettings = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userAvatar = useSelector(getUserAvatar);
  const message = useSelector(getUserMessage);
  console.log(message);
  const [avatarFileURL, setAvatarFileURL] = useState(userAvatar);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  console.log(isMessage);

  const {
    secondName,
    firstName,
    surName,
    tel,
    email,
    cityName,
    streetName,
    houseNamber,
    sex,
    about,
  } = user || {};

  const handleChangeAvatar = url => {
    setAvatarFileURL(url);
  };

  const {
    control,
    register,
    handleSubmit,
    watch
  } = useForm({
    defaultValues: {
      secondName: secondName ? secondName : '',
      firstName: firstName ? firstName : '',
      surName: surName ? surName : '',
      tel: tel ? tel : '',
      email: email ? email : '',
      cityName: cityName ? cityName : 'Київ',
      streetName: streetName ? streetName : '',
      houseNamber: houseNamber ? houseNamber : '',
      sex: sex ? sex : '',
      about: about ? about : '',
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const dataForUpload = {
      secondName: data.secondName,
      firstName: data.firstName,
      surName: data.surName,
      email: data.email,
      tel: data.tel,
      userAvatar: avatarFileURL,
      cityName: data.cityName.value !== undefined ? data.cityName.value : '',
      streetName: data.streetName,
      houseNamber: data.houseNamber,
      sex: data.sex.value !== undefined ? data.sex.value : '',
      about: data.about,
    };
    await dispatch(updateUserSettings(dataForUpload));
    await dispatch(updateUser());
    setIsFormSubmitted(true);
  };

  const resetMessage = () => {
    setIsMessage("");
  }; 
  
  const inputValue = watch('email');

  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  useEffect(() => {
    dispatch(setVerifiEmail(inputValue));
  }, [dispatch, inputValue])

  return (
    <Container>
      <section className={s.mysetwrapper}>
        <Text textClass="title" text="Мої Налаштування" />
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ChangePhoto
            register={register}
            isFormSubmitted={isFormSubmitted}
            onChangeAvatar={handleChangeAvatar}
          />
          <div className={s.partwrapper}>
            <div className={s.partFrame}>
              <Text text={'Прізвище'} textClass="lable-form" />
              <Controller
                control={control}
                name="secondName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.secondName}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={"Ім'я"} textClass="lable-form" />
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.firstName}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'По батькові'} textClass="lable-form" />
              <Controller
                control={control}
                name="surName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.surName}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Email*'} textClass="lable-form" />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    {...register('email')}
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.email}
                  />
                )}
              />
              <Text
                text={
                  'Не додавайте email на mail.ru, mail.ua, yandex.ru, list.ru, inbox.ru, bk.ru, vk.ru, ok.ru'
                }
                textClass="second-text"
              />
              <div className={s.navButton}>
                <ProfileLink to={'/email-verification'} email={email}> 
                  Підтвердити
                </ProfileLink>
              </div>
            </div>
            <div className={s.partFrame}>
              <Text text={'Телефон'} textClass="lable-form" />
              <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.tel}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Місто'} textClass="lable-form" />
              <Controller
                control={control}
                name="cityName"
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={onChange}
                    className="changeProfile"
                    name="cityName"
                    {...field.cityName}
                    options={CityNames}
                    defaultValue={cityName}
                    placeholder={cityName}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Вулиця'} textClass="lable-form" />
              <Controller
                control={control}
                name="streetName"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.streetName}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Номер будинку'} textClass="lable-form" />
              <Controller
                control={control}
                name="houseNamber"
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="changeProfile"
                    value={value}
                    control={control}
                    handleChange={onChange}
                    {...field.houseNamber}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Стать'} textClass="lable-form" />
              <Controller
                control={control}
                name="sex"
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    value={value}
                    handleChange={onChange}
                    className="changeProfile"
                    name="sex"
                    {...field.sex}
                    options={['Чоловік', 'Жінка', 'Інше']}
                    defaultValue={sex}
                    placeholder={sex}
                  />
                )}
              />
            </div>
            <div className={s.partFrame}>
              <Text text={'Про себе'} textClass="lable-form" />
              <Controller
                control={control}
                name="about"
                render={({ field: { onChange, value } }) => (
                  <textarea
                    className={s.aboutChangeProfile}
                    value={value}
                    control={control}
                    onChange={onChange}
                    {...field.about}
                    rows={1}
                    cols={240}
                  />
                )}
              />
            </div>
          </div>
          <div className={s.buttonFrame}>
            <Button text="Зберегти" btnClass="btnLight" />
          </div>
        </form>
        {isMessage && (
          <MessageWindow text={`${message}`} onDismiss={resetMessage} />
        )}
      </section>
    </Container>
  );
};

export default MySettings;
