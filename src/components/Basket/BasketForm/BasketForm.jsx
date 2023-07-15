import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { TfiPlus, TfiCheck } from 'react-icons/tfi';

import { updateUserBasket } from 'redux/auth/auth-opetations';

import Text from 'components/Shared/Text/Text';
import CountBlock from 'components/Basket/CountBlock/CountBlock';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import SizesWithoutSelect from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';

import s from 'components/Basket/BasketForm/BasketForm.module.scss';

const BasketForm = ({ ownerName, products, isTablet }) => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(null);
  const [questionWindow, setQuestionWindow] = useState(false);

  const handleButtonTrashClick = id => {
    setProductId(id);
    setQuestionWindow(true);
  };

  const deleteProductFrombasket = choice => {
    if (choice === 'yes') {
      // console.log('yes', productId);

      dispatch(updateUserBasket({ productId: productId }));
      setQuestionWindow(false);
    } else if (choice === 'no') {
      // console.log('no');
      setProductId(null);
      setQuestionWindow(false);
    }
  };

  return (
    <form>
      <Text textClass="title" text={`Продавець: ${ownerName}`} />
      <ul className={s.oneSellerBasket}>
        {products.map(
          ({ _id, nameProduct, mainPhotoUrl, brendName, price, size }) => (
            <li className={s.wareItem} key={_id}>
              <div className={s.photoAndNameAndPrice}>
                <div className={s.photoAndNameAndBtn}>
                  <div className={s.photoAndName}>
                    <div className={s.thumb}>
                      <img
                        className={s.mainPhotoCard}
                        src={mainPhotoUrl}
                        onError={e => (e.target.src = NoPhoto)}
                        alt={nameProduct}
                      />
                    </div>
                    <div className={s.descriptionWrapper}>
                      <Text textClass="verifyAttention" text={brendName} />
                      <Text textClass="verifyAttention" text={nameProduct} />
                    </div>
                  </div>

                  {isTablet && <CountBlock price={price} />}
                  <RoundButton
                    icon={BsTrash}
                    handleClick={handleButtonTrashClick}
                    id={_id}
                  />
                </div>
                {size.length > 0 && (
                  <SizesWithoutSelect sizes={size} text="Обраний розмір:" />
                )}
                {!isTablet && <CountBlock price={price} />}
              </div>
            </li>
          )
        )}
      </ul>
      <div className={s.linkWrapper}>
        <Link to="/seller/:id" className={s.btnWrapper}>
          <Text
            textClass="verifyAttention"
            text={'Додати інші товари продавця'}
          />
          <RoundButton icon={TfiPlus} />
        </Link>
        <Link to="/checkout" className={s.btnWrapper}>
          <Text textClass="verifyAttention" text={'Оформити замовлення'} />
          <RoundButton icon={TfiCheck} />
        </Link>
      </div>
      {questionWindow && (
        <MessageWindow
          text="Ви впевнені, що хочете видалити товар з кошика?"
          confirmButtons={true}
          onConfirm={deleteProductFrombasket}
        />
      )}
    </form>
  );
};

export default BasketForm;
