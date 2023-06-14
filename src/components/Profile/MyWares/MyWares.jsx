import {
    useSelector,
    // useDispatch
} from 'react-redux';
// import { useEffect } from 'react';
// import { getUserProducts } from 'redux/product/product-operations';
import {
  // getProducts,
  getMyProducts,
} from 'redux/product/product-selectors';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import s from './MyWares.module.scss';

const MyWares = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUserProducts());
//   }, [dispatch]);

const myProducts = useSelector(getMyProducts);
console.log('myProducts in MyWares', myProducts);

return (
    <div>
    
        <section className={s.myWaresWrapper}>
            <ul className={s.waresList}>
                {myProducts.map(({ _id, mainPhotoUrl, additionalPhotoUrl, nameProduct, price }) => (
                    <li className={s.wareItem} key={_id}>
                        <div className={s.partPhotoWrapper}>

                            <img
                                className={s.photoCard}
                                src={mainPhotoUrl}
                                onError={e => (e.target.src = NoPhoto)}
                                alt={nameProduct}
                            />
                            <ul className={s.additionalPhotoWrapper}>
                                {additionalPhotoUrl.map(photo => (
                                    <li className={s.additionalPhoto} key={photo.index}>
                                        <img
                                            className={s.additionalPhotoCard}
                                            src={photo}
                                            onError={e => (e.target.src = NoPhoto)}
                                            alt={nameProduct}
                                        />
                                    </li>
                                )
                                    
                                )}

                            </ul>
                        </div>
                        <div className={s.descriptionWrapper}>
                            <Text textClass="after-title" text={nameProduct} />
                            <Text textClass="after-title" text={`${price}грн.`} />
                        </div>
                        <div className={s.buttonWrapper}>
                            <Button btnClass="myWareButton" text="Відгуки" />
                            <Button btnClass="myWareButton" text="Змінити" />
                            <Button btnClass="myWareButton" text="Видалити" />
                        </div>
                    </li>
                ))}
            </ul>
            {myProducts.length > 0 &&
                <>
                <Button btnClass="btnLight" text="Завантажити ще" />
                <Button btnClass="btnLight" text="На початок"/>
                </>
                
            }
            
            </section>
            
    </div>
);
};

export default MyWares;
