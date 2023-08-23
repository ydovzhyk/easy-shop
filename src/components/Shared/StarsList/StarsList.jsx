import { BsStarFill } from 'react-icons/bs';
import s from './StarsList.module.scss';

const StarsList = ({ rating, size, setFeedbackRating }) => {
  const renderStars = () => {
    const filledStars = Math.round(rating);
    const stars = [];

    if (!setFeedbackRating) {
      for (let i = 0; i < 5; i++) {
        let starClass = s.iconFilled; // Клас зафарбованої зірочки
        if (i >= filledStars) {
          starClass = s.iconEmpty; // Клас не зафарбованої зірочки
        }
        stars.push(
          <li key={i}>
            <BsStarFill className={starClass} size={`${size}px`} />
          </li>
        );
      }
      return stars;
    }

    for (let i = 0; i < 5; i++) {
      let starClass = s.iconFilled; // Клас зафарбованої зірочки
      if (i >= filledStars) {
        starClass = s.iconEmpty; // Клас не зафарбованої зірочки
      }
      stars.push(
        <li key={i}>
          <button
            type="button"
            onClick={() => setFeedbackRating(i)}
            className={s.starButton}
          >
            <BsStarFill className={starClass} size={`${size}px`} />
          </button>
        </li>
      );
    }
    return stars;
  };
  return <ul className={s.iconlist}>{renderStars()}</ul>;
};

export default StarsList;