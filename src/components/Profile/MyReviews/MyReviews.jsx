import {  useState } from 'react';
import s from './MyReviews.module.scss';

const MyReviews = () => {
  const [currentSelector, setcurrentSelector] = useState('seller');
  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
  };
  return (
    <div className={s.reviewsWrapper}>
      <p className={s.heading}>Відгуки</p>
      <ul className={s.optionsList}>
        <li>
          <button
            className={
              currentSelector === 'seller'
                ? `${s.selectButton} ${s.active}`
                : s.selectButton
            }
            onClick={() => handleButtonClick('seller')}
          >
            Як продавця
          </button>
        </li>
        <li>
          <button
            className={
              currentSelector === 'client'
                ? `${s.selectButton} ${s.active}`
                : s.selectButton
            }
            onClick={() => handleButtonClick('client')}
          >
            Як покупця
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyReviews;
