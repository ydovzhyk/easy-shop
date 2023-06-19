import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import s from 'components/Shared/PhotoCollection/PhotoCollection.module.scss'
const PhotoCollection = ({mainPhotoUrl, nameProduct, additionalPhotoUrl}) => {
    return (
        <div className={s.generalPhotoWrapper}>
            <div className={s.thumb}>
                {/* <a href=''> */}
                <img
                    className={s.mainPhotoCard}
                    src={mainPhotoUrl}
                    onError={e => (e.target.src = NoPhoto)}
                    alt={nameProduct}
                />
            {/* </a> */}
            </div>
            <ul className={s.additionalPhotoList}>
                {additionalPhotoUrl.map((photo, index) => (
                    <li className={s.additionalPhotoItem} key={index}>
                        {/* <a href=''> */}
                            <img
                                className={s.additionalPhotoCard}
                                src={photo}
                                onError={e => (e.target.src = NoPhoto)}
                                alt={nameProduct}
                            />
                        {/* </a> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PhotoCollection;