import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
import { getID } from 'redux/auth/auth-selectors';
import { useForm, Controller } from 'react-hook-form';
import { field } from 'components/Shared/TextField/fields';
import { updateUser } from 'redux/auth/auth-opetations';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button';
import s from 'components/Profile/EmailVerification/EmailVerification.module.scss';

const EmailVerification = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getID);
    
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            phoneNumber: ''
        }
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const dataForUpload = {
            phoneNumber: data.phoneNumber,
            owner: userId,
        };
        dispatch(updateUser(dataForUpload));
        
    reset();
    }
    return (
        <Container>
            <div className={s.verifyWrapper}>
                <Text text={'Підтвердіть свою електронну адресу'} textClass="verifyTextTitle" />
                <Text text={'Навіщо це потрібно?'} textClass="verifyTextmiddle" />
                <Text
                    text={'Підтвердіть свою електронну адресу, щоб отримати доступ до додавання оголошень. Це обов\'язкова умова для продажу на EASYshop '}
                    textClass="verifyTextSmall"
                />
                <Text
                    text={'Ваша електронна адреса не буде доступна іншим користувачам на EASYshop'}
                    textClass="verifyTextmiddle"
                />
                <Text text={'Як це зробити:'} textClass="verifyTextmiddle" />
                <div className={s.textWrapper}>
                    <Text
                    text={'1.Натисніть на кнопку "Підтвердити". На вашу електронну адресу буде відправлено посилання'}
                    textClass="verifyTextSmall"
                />
                <Text
                    text={'2.Перейдіть за посиланням, яке отримали в електронному листі'}
                    textClass="verifyTextSmall"
                />
                </div>
                <Text
                    text={'Важливо! Посилання дійсне протягом 10 хвилин з моменту його формування.'}
                    textClass="verifyAttention"
                />
                <div className={s.formWrapper}>
                    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.partFrame}>
                            <Text text={'Введіть електронну адресу'} textClass="verifyAttention" />
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
                                            handleSubmit={onChange}
                                            {...field.email}
                                        />
                                    )}
                                />
                            <Button text="Підтвердити" btnClass="btnLight" />
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
            
        </Container>
        
    )
}

export default EmailVerification;