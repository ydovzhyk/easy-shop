import Text from 'components/Shared/Text/Text';
import ProfileDetails from 'components/Profile/UserInfoDetails/ProfileDetails';
import s from './MyReviews.module.scss';

const MyReviews = () => {
    return (
        <div className={s.reviewsWrapper}>
            <Text text={'Відгуки'} textClass="verifyTextTitle" />
            <ul className={s.list}>
                <li className={s.item}>
                    <ProfileDetails
                    to='s'
                addValue>Як про продавця</ProfileDetails>
                </li>
                <li className={s.item}>
                    <ProfileDetails
                    to='b'
                addValue>Як про покупця</ProfileDetails>
                </li>
                
            </ul>
        </div>
        
    )
}

export default MyReviews;