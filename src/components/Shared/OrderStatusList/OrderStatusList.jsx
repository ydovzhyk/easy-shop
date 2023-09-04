import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import s from './OrderStatusList.module.scss';

const OrderStatusList = ({ currentSelector, handleButtonClick }) => {
    const isTablet = useMediaQuery({ minWidth: 768 });
  return (
    <div className={s.listBox}>
      <p className={s.heading}>За статусом</p>
      {!isTablet && (
        <Select
          classNamePrefix="custom-select"
          onChange={value => handleButtonClick(value.value)}
          options={[
            { value: 'all', label: 'Всі' },
            { value: 'new', label: 'Нові' },
            { value: 'confirmed', label: 'Підтверджені' },
            { value: 'canceled', label: 'Відхилені' },
          ]}
          defaultValue={{ value: 'all', label: 'Всі' }}
          theme={theme => ({
            ...theme,
            borderRadius: 0,
          })}
        />
      )}

      {isTablet && (
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
      )}
    </div>
  );
};

export default OrderStatusList;
