import { useState, useEffect } from 'react';
import Avatar from 'components/Profile/Avatar/Avatar';
import Text from 'components/Shared/Text/Text';
import s from './ChangePhoto.module.scss';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

const ChangePhoto = ({
    register,
    isFormSubmitted,
    onChangeAvatar,
}) => {
    const [avatar, setAvatar] = useState('');
    
    const handleUploadFile =  event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            setAvatar(dataURL);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        onChangeAvatar(avatar);
    }, [avatar, onChangeAvatar]);

    useEffect(() => {
        if (isFormSubmitted) {
        setAvatar('');
        }
    }, [isFormSubmitted]);
    
    return (
        <div className={s.changePhotoWrapper}>
            <div className={s.avatarframe}>
                <div className={s.avatar}>
                    <Avatar
                        src={avatar}
                        avatarClass="photo"
                    />
                </div>
            </div>
            <div className={s.changePhoto}>
                <label>Зміни фото профілю</label>
                <Text
                    textClass="text"
                    text="Виберіть квадратне фото не менше 200*200"
                />
                <FormInputFile
                    register={register}
                    name="avatar"
                    multiple={false}
                    single={true}
                    label="Завантажити"
                    accept="image/png, image/jpeg"
                    onChange={handleUploadFile}
                />
                            
            </div>
        </div>
)
}

export default ChangePhoto;