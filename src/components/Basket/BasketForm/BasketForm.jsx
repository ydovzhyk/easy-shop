import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BsTrash } from 'react-icons/bs';
import { TfiPlus, TfiCheck } from 'react-icons/tfi';
import { updateUserBasket } from 'redux/auth/auth-opetations';
import { addOrder, deleteOrderById } from 'redux/order/order-operations';
import { selectOrderInCheckout } from 'redux/order/order-selectors';

import Text from 'components/Shared/Text/Text';
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
  const orderInCheckout = useSelector(selectOrderInCheckout);

  console.log('products:', products);
    
  const preOrderedProducts = products.map((product) => {
    let modifiedSizes = product.size.map((size) => {
    return {
      ...size[0],
      quantity: size.length
    };
  });
    return {
      _id: product._id,
      quantity: product.size.length,
      size: modifiedSizes,
      price: product.price,
      sum: product.size.length * product.price
    }
  });
  console.log('preOrederedProducts:', preOrderedProducts);

  const [orderedProducts, setOrderedProducts] = useState(preOrderedProducts);
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


  const handleDecrement = (productId, sizeId) => {
  setOrderedProducts(prevOrderedProducts =>
    prevOrderedProducts.map(product => {
      if (product._id === productId) {
        const updatedSizes = product.size.map(size => {
          if (size.name === sizeId) {
            const updatedSize = { ...size};
            updatedSize.quantity -= 1;
            return updatedSize;
          }
          return size;
        });
        const quantity = updatedSizes.reduce((total, size) => total + size.quantity, 0);
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
        const quantity = updatedSizes.reduce((total, size) => total + size.quantity, 0);
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
    if (orderInCheckout.sellerId === ownerId) {
      console.log('order exist');
      await dispatch(deleteOrderById(orderInCheckout._id));
    }
    const newOrder = await dispatch(addOrder(dataForUpload));
    console.log('newOrder', newOrder);
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
            
            const translatedParamsObj = translateParamsToEN(section, category);
            const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
            const sizesForCount = orderedProducts.find(item => item._id === _id)?.size || size
            // console.log('sizesForCount', sizesForCount);
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
                  
                      {/* </div> */}
                        
                        <SizesWithoutSelect
                          sizes={sizesForCount}
                          text="Обраний розмір:"
                          price={price}
                          onDecrement={handleDecrement}
                          onIncrement={handleIncrement}
                          id={_id}
                        />
                      <RoundButton
                            icon={BsTrash}
                            handleClick={handleButtonTrashClick}
                            id={_id}
                          />
                    </div> 
                  </li>
                )})}
              </ul>
              <div className={s.linkWrapper}>
                <Link to='/seller/:id' className={s.btnWrapper}>
                  <Text textClass="verifyAttention" text={'Додати інші товари продавця'}/>
                  <RoundButton icon={TfiPlus}/>
                </Link>
                <Link to='/checkout' className={s.btnWrapper}>
                  <Text textClass="verifyAttention" text={`Оформити замовлення ${totalSum}`}/>
                  <RoundButton
                    icon={TfiCheck}
                    onClick={handleSubmit(onSubmit)}
                  />
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
)
}

export default BasketForm;