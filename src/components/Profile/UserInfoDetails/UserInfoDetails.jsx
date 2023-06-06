import { Suspense } from "react";
import { useLocation, Outlet } from 'react-router-dom';
import Container from 'components/Shared/Container';
import ProfileDetails from './ProfileDetails';
import s from './UserInfoDetails.module.scss';

const UserInfoDetails = () => {
    const location = useLocation();
    console.log(location);
    return (
        <Container>
            <ul className={s.list}>
                <li className={s.item}>
                    <ProfileDetails
                        to='mywares'
                        addValue
                    >Мої товари</ProfileDetails>
                </li>
                <li className={s.item}>
                    <ProfileDetails
                        to='myshoppings'
                        addValue
                    >Мої покупки</ProfileDetails>
                </li>
                <li className={s.item}>
                    <ProfileDetails
                        to='myreviews'
                        addValue
                    >Мої відгуки</ProfileDetails>
                </li>
                <li className={s.item}>
                    <ProfileDetails                
                    to='/mysettings'
                    >Мої налаштування</ProfileDetails>
                </li>
            </ul>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet/>
            </Suspense>
        </Container>
)
}

export default UserInfoDetails;