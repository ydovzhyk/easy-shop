import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsTrash } from 'react-icons/bs';
import { TfiPlus, TfiCheck } from 'react-icons/tfi';
import { updateUserBasket } from 'redux/auth/auth-operations';
import { addOrder, deleteOrderById } from 'redux/order/order-operations';
import { selectOrderInCheckout } from 'redux/order/order-selectors';

import Text from 'components/Shared/Text/Text';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import SizesWithoutSelect from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import { translateParamsToEN } from 'funcs&hooks/translateParamsToEN';
import s from 'components/Basket/BasketForm/BasketForm.module.scss';

const BasketForm = ({ ownerId, ownerName, products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [questionWindow, setQuestionWindow] = useState(false);
  const orderInCheckout = useSelector(selectOrderInCheckout);
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const preOrderedProducts = products.map(product => {
    let modifiedSizes = product.size.map(size => {
      return {
        name: size.name,
        quantity: size.quantity,
        value: size.value,
      };
    });
    const totalQuantity = modifiedSizes.reduce(
      (total, size) => total + size.quantity,
      0
    );
    return {
      _id: product._id,
      quantity: totalQuantity,
      size: modifiedSizes,
      price: product.price,
      sum: product.size.length * product.price,
    };
  });
  const [orderedProducts, setOrderedProducts] = useState(preOrderedProducts);

  const sortedArray = orderedProducts.sort((a, b) => a.sum - b.sum);
  const totalSum = sortedArray.reduce((sum, item) => sum + item.sum, 0);

  const handleButtonTrashClick = id => {
    setProductId(id);
    setQuestionWindow(true);
  };

  const deleteProductFrombasket = choice => {
    if (choice === 'yes') {
      dispatch(updateUserBasket({ productId: productId }));
      setQuestionWindow(false);
    } else if (choice === 'no') {
      setProductId(null);
      setQuestionWindow(false);
    }
  };

  const handleDecrement = (productId, sizeId) => {
    setOrderedProducts(prevOrderedProducts =>
      prevOrderedProducts.map(product => {
        if (product._id === productId) {
          const updatedSizes = product.size.map(size => {
            if (size.name === sizeId) {
              const updatedSize = { ...size };
              updatedSize.quantity -= 1;
              return updatedSize;
            }
            return size;
          });
          const quantity = updatedSizes.reduce(
            (total, size) => total + size.quantity,
            0
          );
          const sum = quantity * product.price;
          return { ...product, size: updatedSizes, quantity, sum };
        }
        return product;
      })
    );
  };

  const handleIncrement = (productId, sizeId) => {
    setOrderedProducts(prevOrderedProducts =>
      prevOrderedProducts.map(product => {
        if (product._id === productId) {
          const updatedSizes = product.size.map(size => {
            if (size.name === sizeId) {
              const updatedSize = { ...size };
              updatedSize.quantity += 1;
              return updatedSize;
            }
            return size;
          });
          const quantity = updatedSizes.reduce(
            (total, size) => total + size.quantity,
            0
          );
          const sum = quantity * product.price;
          return { ...product, size: updatedSizes, quantity, sum };
        }
        return product;
      })
    );
  };

  const { handleSubmit } = useForm({
    defaultValues: {
      ownerId: ownerId ? ownerId : '',
      ownerName: ownerName ? ownerName : '',
      products: orderedProducts ? orderedProducts : [],
      totalSum: totalSum ? totalSum : null,
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const dataForUpload = {
      ownerId: ownerId,
      ownerName: data.ownerName,
      products: orderedProducts,
      totalSum: totalSum,
    };
    if (orderInCheckout.sellerId === ownerId) {
      await dispatch(deleteOrderById(orderInCheckout._id));
    }
    const newOrder = await dispatch(addOrder(dataForUpload));
    if (newOrder.payload.newOrderId) {
      for (const product of orderedProducts) {
        await dispatch(updateUserBasket({ productId: product._id }));
      }
      navigate('/checkout', {
        state: { orderId: newOrder.payload.newOrderId },
      });
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Text textClass="title" text={`Продавець: ${ownerName}`} />
      <ul className={s.oneSellerBasket}>
        {products.map(
          ({
            _id,
            nameProduct,
            mainPhotoUrl,
            brendName,
            price,
            size,
            section,
            category,
          }) => {
            const translatedParamsObj = translateParamsToEN(section, category);
            const [categoryName, subCategoryName] =
              Object.values(translatedParamsObj);
            const sizesForCount =
              orderedProducts.find(item => item._id === _id)?.size || size;
            return (
              <li className={s.wareItem} key={_id}>
                <div className={s.photoAndNameAndPrice}>
                  <div className={s.photoAndName}>
                    <Link
                      to={`/product/${categoryName}/${subCategoryName}/${_id}`}
                    >
                      <div className={s.thumb}>
                        <img
                          className={s.mainPhotoCard}
                          src={mainPhotoUrl}
                          onError={e => (e.target.src = NoPhoto)}
                          alt={nameProduct}
                        />
                      </div>
                    </Link>
                    <div className={s.descriptionWrapper}>
                      <Text textClass="verifyAttention" text={brendName} />
                      <Text textClass="verifyAttention" text={nameProduct} />
                    </div>
                  </div>
                  <div className={s.sizesAndButtonWrapper}>
                    <SizesWithoutSelect
                      sizes={sizesForCount}
                      text="Обраний розмір:"
                      price={price}
                      onDecrement={handleDecrement}
                      onIncrement={handleIncrement}
                      id={_id}
                    />
                    {!isDesktop && (
                      <RoundButton
                        icon={BsTrash}
                        handleClick={handleButtonTrashClick}
                        id={_id}
                      />
                    )}
                  </div>
                  {isDesktop && (
                    <div style={{ alignSelf: 'center' }}>
                      <RoundButton
                        icon={BsTrash}
                        handleClick={handleButtonTrashClick}
                        id={_id}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          }
        )}
      </ul>
      <div className={s.linkWrapper}>
        <Link to={`/member/${ownerId}`} className={s.btnWrapper}>
          <Text
            textClass="verifyAttention"
            text={'Додати інші товари продавця'}
          />
          <RoundButton icon={TfiPlus} />
        </Link>
        <Link to="/checkout" className={s.btnWrapper}>
          <Text
            textClass="verifyAttention"
            text={`Оформити замовлення на суму ${totalSum} грн.`}
          />
          <RoundButton icon={TfiCheck} onClick={handleSubmit(onSubmit)} />
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
