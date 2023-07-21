import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getID } from "redux/auth/auth-selectors";
import { getAllOrders, getUserOrders } from "redux/order/order-operations";
import { selectAllOrders, selectUserOrders } from "redux/order/order-selectors";

const MyShoppings = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(selectUserOrders);
    const allOrders = useSelector(selectAllOrders);
    const user = useSelector(getID)
    useEffect(() => {
        dispatch(getAllOrders())
        const userOrders = dispatch(getUserOrders(user));
        console.log(userOrders);
    }, [dispatch, user]);
    console.log(allOrders);
    console.log(userOrders);
    return (
        <h3>Мої покупки</h3>
    )
}

export default MyShoppings;