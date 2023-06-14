import { useState, useEffect } from 'react';
import FormInputFile from 'components/Shared/FormInputFile/FormInputFile';
import Text from 'components/Shared/Text/Text';
import s from './Photo.module.scss';

const Photo = ({
  register,
  isFormSubmitted,
  onChangeMainFile,
  onChangeAdditionalFiles,
}) => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [mainFile, setMainFile] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const text = [
    'Фото iз зворотньої сторони виробу',
    'Фото на вішалці',
    'Фото бірки виробу',
    'Фото плям та інші недоліки',
    'Інше',
  ];

  const handleMainFileUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setBackgroundImage(`url(${dataURL})`);
      setMainFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalFilesUpload = async event => {
    const files = event.target.files;
    const images = [];
    const additionalFiles = [];

    for (let i = 0; i < files.length && i < 5; i++) {
      const file = files[i];
      const dataURL = await readFileAsDataURL(file);
      images.push(dataURL);
      additionalFiles.push(file);
    }
    setAdditionalImages(images);
    setAdditionalFiles(additionalFiles);
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

  useEffect(() => {
    onChangeMainFile(mainFile);
    onChangeAdditionalFiles(additionalFiles);
  }, [mainFile, additionalFiles, onChangeMainFile, onChangeAdditionalFiles]);

  useEffect(() => {
    if (isFormSubmitted) {
      setBackgroundImage('');
      setAdditionalImages([]);
    }
  }, [isFormSubmitted]);

  return (
    <div className={s.photoPart}>
      <div>
        <Text text={'Виберіть основну фотографію*'} textClass="after-title" />
        <div
          className={s.imageCard}
          style={{ backgroundImage: backgroundImage, marginBottom: 10 }}
        >
          <div className={s.imageCardContent}>
            <Text
              text={'Фото виробу у повному розмірі'}
              textClass="after-title-cardContent"
            />
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
      </div>
      <div>
        <Text text={'Додайте ще 5 фотографій*'} textClass="after-title" />
        <div className={s.additionalImages}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={s.imageCard}
              style={{
                backgroundImage:
                  additionalImages[index] && `url(${additionalImages[index]})`,
              }}
            >
              {index > 0 && (
                <Text
                  text={`${text[index]}`}
                  textClass="after-title-cardContent"
                />
              )}
              {index === 0 && (
                <div className={s.imageCardContent}>
                  <Text
                    text={`${text[index]}`}
                    textClass="after-title-cardContent"
                  />
                  <FormInputFile
                    name="files"
                    accept="image/png, image/jpeg"
                    register={register}
                    onChange={handleAdditionalFilesUpload}
                    multiple={true}
                    single={false}
                    label="Інші"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photo;
