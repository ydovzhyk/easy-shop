import { useSelector, useDispatch } from 'react-redux';
import {getUserProducts } from 'redux/product/product-operations';
import { getProducts } from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';

const MyWares = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProducts);
    const userID = useSelector(getID);
    console.log(products);

    dispatch(getUserProducts(userID));
    
    return (
        <h3>My wares</h3>
    )
}

export default MyWares;