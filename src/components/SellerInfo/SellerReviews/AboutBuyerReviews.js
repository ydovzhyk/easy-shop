import { useSelector } from 'react-redux';
import {
  getLoadingReviews,
  selectUserReviews,
} from 'redux/review/review-selectors';

const AboutBuyerReviews = () => {
  const sellerReviews = useSelector(selectUserReviews);
  console.log('sellerReviews in AboutBuyerReviews:', sellerReviews);
  const loading = useSelector(getLoadingReviews);

  return (
    <>
      {!loading && sellerReviews.length === 0 && (
        <p>Ще немає відгуків промене, як про покупця</p>
      )}
      {sellerReviews.length > 0 && (
        <div>
          `Тут буде {sellerReviews.length} відгуків про мене, як про покупця`
        </div>
      )}
    </>
  );
};

export default AboutBuyerReviews;
