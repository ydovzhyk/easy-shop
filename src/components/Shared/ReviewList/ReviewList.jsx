import Avatar from 'components/Profile/Avatar/Avatar';
import StarsList from 'components/Shared/StarsList/StarsList';
import s from './ReviewList.module.scss';

const ReviewList = ({ review }) => {
  return (
    <ul className={s.reviewsWrapper}>
      {review.map(
        ({ _id, reviewer, rating, reviewDate, products, feedback }) => {
          return (
            <li className={s.reviewBox} key={_id}>
              <div className={s.avatarBox}>
                <Avatar src={reviewer.reviewerFoto} />
              </div>
              <div className={s.reviewWrapper}>
                <div className={s.topReviewWrapper}>
                  <div>
                    <p className={s.reviewerName}>{reviewer.reviewerName}</p>
                    <StarsList rating={rating} size={16} />
                  </div>
                  <p>{reviewDate}</p>
                </div>
                <ul className={s.productName}>
                  {products.map(product => (
                    <li key={product._id}>{product.nameProduct}</li>
                  ))}
                </ul>
                <p>{feedback}</p>
              </div>
            </li>
          );
        }
      )}
    </ul>
  );
};

export default ReviewList;
