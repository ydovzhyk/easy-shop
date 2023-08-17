import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
// import { BsStarFill } from 'react-icons/bs';
import Button from 'components/Shared/Button/Button';
import { StarsList } from './StarsList';
import Avatar from 'components/Profile/Avatar/Avatar';
import s from 'components/Shared/FeedbackWindow/FeedbackWindow.module.scss';

const FeedbackWindow = ({ hideWindow }) => {
    const [rating, setRating] = useState(1);

    const calculatedRating = `${Number(rating).toFixed(1)}`;

    const setFeedbackRating = number => setRating(number + 1);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            rating: rating,
            feedback: '',
        },
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const feedbackData = {
            rating: rating,
            feedback: data.feedback,
        };
        console.log(feedbackData);
        reset();
        hideWindow();
    }

  return (
    <div className={s.windowBackdrop}>
      <div className={s.windowContainer}>
        <button className={s.closeButton} onClick={hideWindow}>
          <FiX />
        </button>
        <form className={s.feedbackForm}>
          <p className={s.heading}>Залишити відгук</p>
          <div className={s.starsBox}>
            <StarsList
              rating={rating}
              size={24}
              setFeedbackRating={setFeedbackRating}
            />
            <p className={s.ratingNumber}>{calculatedRating}</p>
          </div>
          <p className={s.feedbackTitle}>Напишіть свій відгук:</p>
          <Controller
            control={control}
            name="feedback"
            // rules={{
            //   required: true,
            // }}
            render={({ field: { onChange, value } }) => (
              <textarea
                className={s.textarea}
                value={value}
                onChange={onChange}
                name="feedback"
                type="text"
                rows={4}
                cols={40}
              />
            )}
          />
          <Button
            type="submit"
            btnClass="btnLight"
            text="Відправити відгук"
            handleClick={handleSubmit(onSubmit)}
          />
        </form>
        <p className={s.reviewsHeading}>Відгуки інших користувачів:</p>
        <ul className={s.reviewsWrapper}>
          
          <li className={s.reviewBox}>
            <div className={s.avatarBox}>
              <Avatar />
            </div>
            <div className={s.reviewWrapper}>
              <div className={s.topReviewWrapper}>
                <div>
                  <p className={s.reviewerName}>Kateryna</p>
                  <StarsList rating={rating} size={16} />
                </div>
                <p>data</p>
              </div>
              <p>black dress</p>
              <p>review</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackWindow;
