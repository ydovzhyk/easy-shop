import { useState } from 'react';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';
import Text from 'components/Shared/Text/Text';
import s from './Photo.module.scss';

const Photo = ({ register }) => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleMainFileUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setBackgroundImage(`url(${dataURL})`);
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalFilesUpload = async event => {
    const files = event.target.files;
    const images = [];

    for (let i = 0; i < files.length && i < 4; i++) {
      const file = files[i];
      const dataURL = await readFileAsDataURL(file);
      images.push(dataURL);

      if (i === 3 || i === files.length - 1) {
        setAdditionalImages(images);
      }
    }
  };

  const readFileAsDataURL = file => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={s.photoPart}>
      <div>
        <Text text={'Виберіть основну фотографію*'} textClass="after-title" />
        <div
          className={s.imageCard}
          style={{ backgroundImage: backgroundImage }}
        >
          <FormInputFile
            name="mainFile"
            accept="image/png, image/jpeg"
            register={register}
            onChange={handleMainFileUpload}
            multiple={false}
            single={true}
            label="Основна"
          />
        </div>
      </div>
      <div>
        <Text text={'Додайте ще 4 фотографії*'} textClass="after-title" />
        <div className={s.additionalImages}>
          {additionalImages.map((image, index) => (
            <div
              key={index}
              className={s.imageCard}
              style={{ backgroundImage: `url(${image})` }}
            >
              {index < 1 && (
                <FormInputFile
                  name="files"
                  accept="image/png, image/jpeg"
                  register={register}
                  onChange={handleAdditionalFilesUpload}
                  multiple={true}
                  single={false}
                  label="Інші"
                />
              )}
            </div>
          ))}
          {additionalImages.length < 1 && (
            <div className={s.imageCard}>
              <FormInputFile
                name="files"
                accept="image/png, image/jpeg"
                register={register}
                onChange={handleAdditionalFilesUpload}
                multiple={true}
                single={false}
                label="Інші фотографії"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photo;
