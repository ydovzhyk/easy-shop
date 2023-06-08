import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserAvatar } from 'redux/auth/auth-selectors';
import Avatar from 'components/Profile/Avatar/Avatar';
import Text from 'components/Shared/Text/Text';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import s from './ChangePhoto.module.scss';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';

const ChangePhoto = ({ register, isFormSubmitted, onChangeAvatar }) => {
  const userAvatar = useSelector(getUserAvatar);
  const [avatar, setAvatar] = useState(userAvatar);
  const [selectedAvatar, setSelectedAvatar] = useState(userAvatar);
  const [warning, setWarning] = useState('');

  const handleUploadFile = event => {
    const file = event.target.files[0];
    const maxSizeInBytes = 75000;
    if (file.size > maxSizeInBytes) {
      setWarning('Розмір файлу перевищує допустимий розмір');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setSelectedAvatar(dataURL);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedAvatar) {
      setAvatar(selectedAvatar);
      onChangeAvatar(selectedAvatar);
    }
  }, [selectedAvatar, onChangeAvatar]);

  useEffect(() => {
    if (isFormSubmitted) {
      setAvatar(userAvatar);
      setSelectedAvatar(userAvatar);
    }
  }, [isFormSubmitted, userAvatar]);

  const resetError = () => {
    setWarning('');
  };

  return (
    <div className={s.changePhotoWrapper}>
      <div className={s.avatarframe}>
        <div className={s.avatar}>
          <Avatar src={avatar} avatarClass="photo" />
        </div>
      </div>
      <div className={s.changePhoto}>
        <label>Зміни фото профілю</label>
        <Text
          textClass="text"
          text="Виберіть квадратне фото не більше ніж 75 кб"
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
      {warning && <ErrorMessage text={warning} onDismiss={resetError} />}
    </div>
  );
};

export default ChangePhoto;
