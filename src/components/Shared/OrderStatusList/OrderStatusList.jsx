import s from './OrderStatusList.module.scss';

const OrderStatusList = ({ currentSelector, handleButtonClick }) => {
  return (
    <ul className={s.optionsList}>
      <li>
        <button
          className={
            currentSelector === 'all'
              ? `${s.selectButton} ${s.active}`
              : s.selectButton
          }
          onClick={() => handleButtonClick('all')}
        >
          Всі
        </button>
      </li>
      <li>
        <button
          className={
            currentSelector === 'new'
              ? `${s.selectButton} ${s.active}`
              : s.selectButton
          }
          onClick={() => handleButtonClick('new')}
        >
          Нові
        </button>
      </li>
      <li>
        <button
          className={
            currentSelector === 'confirmed'
              ? `${s.selectButton} ${s.active}`
              : s.selectButton
          }
          onClick={() => handleButtonClick('confirmed')}
        >
          Підтверджені
        </button>
      </li>
      {/* <li>Виконані</li> */}
      <li>
        <button
          className={
            currentSelector === 'canceled'
              ? `${s.selectButton} ${s.active}`
              : s.selectButton
          }
          onClick={() => handleButtonClick('canceled')}
        >
          Відхилені
        </button>
      </li>
    </ul>
  );
};

export default OrderStatusList;
