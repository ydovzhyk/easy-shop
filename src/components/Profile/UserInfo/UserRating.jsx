import PropTypes from 'prop-types';
import { BsStarFill } from "react-icons/bs";
import Value from '../Value';
import s from './UserInfo.module.scss';

const UserRating = ({ rating, gradesAmount }) => {
    const renderStars = () => {
        const filledStars = Math.round(rating);
        const stars = [];

        for (let i = 0; i < 5; i++) {
            let starClass = s.iconFilled; // Клас зафарбованої зірочки
            if (i >= filledStars) {
                starClass = s.iconEmpty; // Клас не зафарбованої зірочки
            }
            stars.push(
                <li key={i}>
                    <BsStarFill className={starClass} size="16px" />
                </li>)
        }

        return stars;
    };
    return (
        <div className={s.ratingbox}>
            <ul className={s.iconlist}>{renderStars()}</ul>
            <div className={s.valuation}>
                <Value className={s.leftvalue}>{Math.round(rating)}</Value>
                <p>(
                    <Value className={s.leftvalue}>{gradesAmount}</Value>
                    оцінок)
                </p>
            </div>
        </div>
    );
};

UserRating.propTypes = {
    rating: PropTypes.number,
    gradesAmount: PropTypes.number,
}

UserRating.defaultProps = {
    rating: 0,
    gradesAmount: 0,
}

export default UserRating;

