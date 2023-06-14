import Text from 'components/Shared/Text/Text';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from './MyReviews.module.scss';

const MyReviews = () => {
    return (
        <div className={s.reviewsWrapper}>
            <Text text={'Відгуки'} textClass="verifyTextTitle" />
            <ul className={s.list}>
                <li className={s.item}>
                    <ProfileLink
                    to='s'
                addValue>Як про продавця</ProfileLink>
                </li>
                <li className={s.item}>
                    <ProfileLink
                    to='b'
                addValue>Як про покупця</ProfileLink>
                </li>
                
            </ul>
        </div>
        
    )
}

export default MyReviews;