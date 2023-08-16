import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import Button from 'components/Shared/Button/Button';
import s from 'components/Shared/FeedbackWindow/FeedbackWindow.module.scss';

const FeedbackWindow = ({ hideWindow }) => {
    const [rating, setRating] = useState(1);

    const calculatedRating = `${Number(rating).toFixed(1)}`;

    const setFeedbackRating = (number) => {
        setRating(number + 1);
    }

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
                <button
                  type='button'
                  onClick={() => setFeedbackRating(i)}
                  className={s.starButton}
                >
                  <BsStarFill className={starClass} size="36px" />
                </button>
              </li>
            );
        }
        return stars;
    };
    
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
          <p className={s.ratingNumber}>{calculatedRating}</p>
          <ul className={s.iconlist}>{renderStars()}</ul>
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
                rows={8}
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
      </div>
    </div>
  );
};

export default FeedbackWindow;
