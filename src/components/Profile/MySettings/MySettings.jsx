// import { useState, useEffect } from 'react';
import Container from 'components/Shared/Container';
import Avatar from 'components/Profile/UserInfo/Avatar';
import Text from 'components/Shared/Text/Text';
// import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

import s from './MySettings.module.scss';

const MySettings = (
    // { register, isFormSubmitted, onChangeAvatar }
) => {

    // const [avatar, setAvatar] = useState('');
    
    // const handleUploadFile =  event => {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //     const dataURL = reader.result;
    //     setAvatar(`url(${dataURL})`);
    // };
    // reader.readAsDataURL(file);
    // };

    // useEffect(() => {
    //     onChangeAvatar(avatar);
    // }, [avatar, onChangeAvatar]);

    // useEffect(() => {
    // if (isFormSubmitted) {
    //     setAvatar('');
    // }
    // }, [isFormSubmitted]);
    
    return (
        <Container >
            <section className={s.mysetwrapper}>
                <Text textClass="title"
                text="Мої Налаштування"/> 
                <form>
                    <div className={s.changePhotoWrapper}>
                        <div className={s.avatarframe}>
                            <div className={s.avatar}>
                                <Avatar
                                    className={s.photo}
                                />
                            </div>
                        </div>
                        <div className={s.changePhoto}>
                            <label>Зміни фото профілю</label>
                            <Text
                                textClass="text"
                                text="Виберіть квадратне фото не менше 200*200"
                            />
                            {/* <FormInputFile
                                name="avatar"
                                accept="image/png, image/jpeg"
                                register={register}
                                onChange={handleUploadFile}
                                multiple={false}
                                single={true}
                                label="Завантажити"
                            /> */}
                            
                        </div>
                    </div>
                </form>
            </section>
            
    
        </Container>
        )
}

export default MySettings;