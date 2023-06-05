import { useSelector, useDispatch } from 'react-redux';
import { getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { updateUser } from 'redux/auth/auth-opetations';
import { field } from 'components/Shared/TextField/fields';
// import {NavLink} from 'react-router-dom';
import Container from 'components/Shared/Container';
import ChangePhoto from '../ChangePhoto/ChangePhoto';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import TextField from 'components/Shared/TextField/TextField';
import ProfileDetails from '../UserInfoDetails/ProfileDetails';
// import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

import s from './MySettings.module.scss';

const MySettings = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getID);
    const [avatarFileURL, setAvatarFileURL] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleChangeAvatar = url => {
    setAvatarFileURL(url);
    };
    
    const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      
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
            file: avatarFileURL,
            owner: userId,
        };
        dispatch(updateUser(dataForUpload));
        setAvatarFileURL('');
        setIsFormSubmitted(true);
        reset();
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
                            <ProfileDetails
                                className={s.change}
                                to={"/phone-verification"}
                            navClass="change">Змінити</ProfileDetails>
                        </div>
                        <div className={s.partFrame}>
                            <Text text={'Пароль'} textClass="lable-form" />
                            <ProfileDetails
                                className={s.change}
                                to={"/login/create-password"}
                            navClass="change">Змінити</ProfileDetails>
                        </div>
                    </div>
                    <Button text="Зберегти" btnClass="btnLight" />
                </form>
            </section>
            
    
        </Container>
        )
}

export default MySettings;
