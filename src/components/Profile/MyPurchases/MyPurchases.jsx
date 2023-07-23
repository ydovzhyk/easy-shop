import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "redux/order/order-operations";
import { selectUserOrders } from "redux/order/order-selectors";

const MyShoppings = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(selectUserOrders);
    let page = 1;
    useEffect(() => {
      dispatch(getUserOrders(page));
    }, [dispatch, page]);
    userOrders && console.log(userOrders);
    return (
        <h3>Мої покупки</h3>
    )
}

export default MyShoppings;