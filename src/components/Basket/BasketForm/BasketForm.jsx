import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsTrash } from 'react-icons/bs';
import { TfiPlus, TfiCheck } from 'react-icons/tfi';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { updateUserBasket } from 'redux/auth/auth-opetations';
import { addOrder } from 'redux/order/order-operations';

import Text from 'components/Shared/Text/Text';
import CountBlock from 'components/Basket/CountBlock/CountBlock';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import SizesWithoutSelect from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import { translateParamsToEN } from 'funcs&hooks/translateParamsToEN';
import s from 'components/Basket/BasketForm/BasketForm.module.scss';


const BasketForm = ({ ownerId, ownerName, products, isTablet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [questionWindow, setQuestionWindow] = useState(false);

  const preOrederedProducts = products.map((product) => {
    return { _id: product._id, quantity: product.size.length, size: product.size, price: product.price, sum: product.size.length * product.price}
  });
  console.log('preOrederedProducts:', preOrederedProducts);

  const [orderedProducts, setOrderedProducts] = useState(preOrederedProducts);
  console.log('orderedProducts:', orderedProducts);

  const sortedArray = orderedProducts.sort((a, b) => a.sum - b.sum);
  const totalSum = sortedArray.reduce((sum, item) => sum + item.sum, 0);

  const handleButtonTrashClick = id => {
    setProductId(id);
    setQuestionWindow(true);
  };

  const deleteProductFrombasket = choice => {
    if (choice === 'yes') {
        // console.log('yes', productId);
      dispatch(updateUserBasket({productId: productId}));
      setQuestionWindow(false);
    } else if (choice === 'no') {
        // console.log('no');
      setProductId(null)
      setQuestionWindow(false);
    }
  };

  const handleDecrement = (productId) => {
    setOrderedProducts((prevOrderedProducts) =>
      prevOrderedProducts.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity - 1, sum: product.sum - product.price };
        }
        return product;
      })
    );
  };
const handleIncrement = (productId) => {
    setOrderedProducts((prevOrderedProducts) =>
      prevOrderedProducts.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1, sum: product.sum + product.price };
        }
        return product;
      })
    );
  };

  const { handleSubmit } = useForm({
    defaultValues: {
      ownerName: ownerName ? ownerName : '',
      products: orderedProducts ? orderedProducts : [],
      totalSum: totalSum ? totalSum: null,
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const dataForUpload = {
      ownerId: ownerId,
      ownerName: data.ownerName,
      products: orderedProducts,
      totalSum: totalSum,
    };
    console.log('Відправка форми', dataForUpload);
    const newOrder = await dispatch(addOrder(dataForUpload));
    // console.log('newOrder', newOrder);
    // console.log('!newOrder', !newOrder.payload.newOrderId);
    if (newOrder.payload.newOrderId) {
      navigate('/checkout')
    };
  };

    return (
      <form className={s.form}
        onSubmit={handleSubmit(onSubmit)}
      >
            <Text textClass="title" text={`Продавець: ${ownerName}`} />
            <ul className={s.oneSellerBasket}>
          {products.map(({ _id, nameProduct, mainPhotoUrl, brendName, price, size, section, category }) => {
            const quantity = orderedProducts.find(item => item._id === _id)?.quantity || 1;
            const translatedParamsObj = translateParamsToEN(section, category);
            const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
            return (
                  <li className={s.wareItem} key={_id}>
                    <div className={s.photoAndNameAndPrice}>
                  {/* <div className={s.photoAndNameAndBtn}> */}
                  <div className={s.photoAndName}>
                      <Link to={`/products/${categoryName}/${subCategoryName}/${_id}`}>
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
                  </Link>
                  </div>
                        {isTablet && (
                          <div className={s.priceAndQuantity}>
                            <div className={s.smallBox}>
                              <div className={s.key}>Ціна</div>
                              <div className={s.sumValue}>{`${price} грн.`}</div>
                            </div>
                            <div className={s.smallBox}>
                              <div className={s.key}>Кількість</div>
                              <div className={s.buttonWrapper}>
                                <button
                                  type="button"
                                  onClick={() => handleDecrement(_id)}
                                >
                                  <AiOutlineMinus />
                                </button>
                                <span className={s.quantValue}>{quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => handleIncrement(_id)}
                                >
                                  <AiOutlinePlus />
                                </button>
                              </div>
                            </div>
                            <div className={s.smallBox}>
                              <div className={s.key}>Сума</div>
                              <div className={s.sumValue}>{`${
                                quantity * price
                              } грн.`}</div>
                            </div>
                          </div>
                        )}
                        <RoundButton
                          icon={BsTrash}
                          handleClick={handleButtonTrashClick}
                          id={_id}
                        />
                        {/* </div> */}
                        {size.length > 0 && (
                          <SizesWithoutSelect sizes={size} text="Обраний розмір:" />
                        )}
                      {!isTablet && (
                          // <div className={s.priceAndQuantity}>
                          //   <div className={s.smallBox}>
                          //       <div className={s.key }>Ціна</div>
                          //       <div className={s.sumValue}>{`${price} грн.` }</div>
                          //   </div>
                          //   <div className={s.smallBox}>
                          //       <div className={s.key }>Кількість</div>
                          //       <div className={s.buttonWrapper}>
                          //           <button
                          //               type="button"
                          //               onClick={() => handleDecrement(_id)}
                          //           >
                          //               <AiOutlineMinus />
                          //           </button>
                          //           <span className={s.quantValue}>{
                          //               quantity
                          //           }</span>
                          //           <button
                          //               type="button"
                          //               onClick={() => handleIncrement(_id)}
                          //           >
                          //               <AiOutlinePlus />
                          //           </button>
                          //       </div>
                          //   </div>
                          //   <div className={s.smallBox}>
                          //       <div className={s.key }>Сума</div>
                          //       <div className={s.sumValue}>{`${quantity * price} грн.` }</div>
                          //   </div>
                          // </div>
                      <CountBlock
                        number={quantity}
                        price={price}
                        onMinus={handleDecrement}
                        onPlus={handleIncrement}
                        id={_id}
                      />
                      )}
                    </div>
                  </li>
              );
            }
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
            <Text
              textClass="verifyAttention"
              text={`Оформити замовлення ${totalSum}`}
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
