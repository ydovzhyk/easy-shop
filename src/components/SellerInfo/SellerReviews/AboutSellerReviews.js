import { useSelector } from 'react-redux';
import {
  getLoadingReviews,
  selectUserFeedback,
} from 'redux/review/review-selectors';

const AboutSellerReviews = () => {
  const sellerFeedback = useSelector(selectUserFeedback);
  console.log('sellerFeedback in AboutSellerReviews:', sellerFeedback);
  const loading = useSelector(getLoadingReviews);
  return (
    <>
      {!loading && sellerFeedback.length === 0 && (
        <p
        // className={s.message}
        >
          Ще немає відгуків промене, як про продавця
        </p>
      )}
      {sellerFeedback.length > 0 && (
        <div>
          `Тут буде {sellerFeedback.length} відгуків про мене, як про продавця`
        </div>
      )}
    </>
  );
};

export default AboutSellerReviews;
