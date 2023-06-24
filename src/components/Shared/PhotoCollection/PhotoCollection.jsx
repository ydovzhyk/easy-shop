import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import s from 'components/Shared/PhotoCollection/PhotoCollection.module.scss'
import LightBox from '../LightBox/LightBox';

const PhotoCollection = ({ mainPhotoUrl, nameProduct, additionalPhotoUrl }) => {
    const imagesArray = [mainPhotoUrl, ...additionalPhotoUrl];
    return (
      <div className={s.generalPhotoWrapper}>
        <div className={s.thumb}>
          <LightBox
            src={mainPhotoUrl}
            alt={nameProduct}
            imagesArray={imagesArray}
          >
            <img
              className={s.mainPhotoCard}
              src={mainPhotoUrl}
              onError={e => (e.target.src = NoPhoto)}
              alt={nameProduct}
            />
          </LightBox>
        </div>
        <ul className={s.additionalPhotoList}>
          {additionalPhotoUrl.map((photo, index) => (
            <li className={s.additionalPhotoItem} key={index}>
              <LightBox src={photo} alt={nameProduct} imagesArray={imagesArray}>
                <img
                  className={s.additionalPhotoCard}
                  src={photo}
                  onError={e => (e.target.src = NoPhoto)}
                  alt={nameProduct}
                />
              </LightBox>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default PhotoCollection;