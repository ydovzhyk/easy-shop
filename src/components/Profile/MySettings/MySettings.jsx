import { useSelector, useDispatch } from 'react-redux';
// import { getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { updateUserSettings } from 'redux/auth/auth-opetations';
import { field } from 'components/Shared/TextField/fields';
import { getUser } from 'redux/auth/auth-selectors';
import Container from 'components/Shared/Container';
import ChangePhoto from '../ChangePhoto/ChangePhoto';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import TextField from 'components/Shared/TextField/TextField';
import SelectField from 'components/Shared/SelectField/SelectField';
import ProfileDetails from '../UserInfoDetails/ProfileDetails';
import { CityNames } from './Options';


import s from './MySettings.module.scss';
// import { axiosUpdateUserSettings } from 'api/auth';

const MySettings = () => {
    const dispatch = useDispatch();
    // const userId = useSelector(getID);
    const user = useSelector(getUser);
    const email = user.email;
    const [avatarFileURL, setAvatarFileURL] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleChangeAvatar = url => {
    setAvatarFileURL(url);
    };
    
    const { control, register, handleSubmit,
        // reset
    } = useForm({
        defaultValues: {
            secondName: '',
            firstName: '',
            surName: '',
            email,
            tel: '',
            cityName: 'Київ',
            streetName: '',
            houseNamber: '',
            sex: '',
            about: ''
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
            // owner: userId,
            cityName: data.cityName,
            streetName: data.streetName,
            houseNamber: data.houseNamber,
            sex: data.sex,
            about: data.about
        };
        dispatch(updateUserSettings(dataForUpload));
        // setAvatarFileURL('');
        setIsFormSubmitted(true);
    }

    
    return (
        <Container >
            <section className={s.mysetwrapper}>
                <Text textClass="title"
                text="Мої Налаштування"/> 
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <ChangePhoto
                        register={register}
                        isFormSubmitted={isFormSubmitted}
                        onChangeAvatar={handleChangeAvatar} />
                    <div className={s.partwrapper}>
                        <div className={s.partFrame}>
                            <Text text={'Прізвище'} textClass="lable-form" />
                            <Controller
                                control={control}
                                name="secondName"
                                rules={{
                                    required: true,
                                }}
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
                            <Text text={'Ім\'я'} textClass="lable-form" />
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{
                                    required: true,
                                }}
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
                                rules={{
                                    required: true,
                                }}
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
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        className="changeProfile"
                                        value={value}
                                        control={control}
                                        handleChange={onChange}
                                        {...field.email}
                                    />
                                )}
                            />
                            <Text
                                text={'Не додавайте email на mail.ru, mail.ua, yandex.ru, list.ru, inbox.ru, bk.ru, vk.ru, ok.ru'}
                                textClass="second-text"/>
                        </div>
                        <div className={s.partFrame}>
                            <Text text={'Телефон'} textClass="lable-form" />
                            <Controller
                                control={control}
                                name="tel"
                                rules={{
                                    required: true,
                                }}
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
                            <div className={s.navButton}>
                                <ProfileDetails
                                    to={"/phone-verification"}
                                >Змінити</ProfileDetails>                                
                            </div>
                            
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
                                    />
                            )}/>
                        </div>
                        <div className={s.partFrame}>
                            <Text text={'Вулиця'} textClass="lable-form" />
                            <Controller
                                control={control}
                                name="streetName"
                                rules={{
                                    required: true,
                                }}
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
                                rules={{
                                    required: true,
                                }}
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
                                        options={[
                                            'Чоловік',
                                            'Жінка',
                                            'Інше'
                                        ]}
                                    />
                            )}/>
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
                                        handleChange={onChange}
                                        {...field.about}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className={s.buttonFrame}>
                        <Button text="Зберегти" btnClass="btnLight" />
                    </div>
                    
                </form>
            </section>
        </Container>
        )
}

export default MySettings;
