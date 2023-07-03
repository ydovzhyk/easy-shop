import { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import CalendarIcon from './CalendarImage/CalendarImage';
import 'react-datepicker/dist/react-datepicker.css';

import s from './Calendar.module.scss';

export default function Calendar({
  dateFormat = 'MM.dd.yyyy',
  showMonthYearPicker,
  value,
  handleChange,
}) {
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 2);

  const [selectedDate, setSelectedDate] = useState(
    moment(value, 'DD.MM.YYYY').toDate()
  );

  useEffect(() => {
    setSelectedDate(moment(value, 'DD.MM.YYYY').toDate());
  }, [value]);

  const handleDateChange = date => {
    setSelectedDate(date);
    handleChange(moment(date).format('DD.MM.YYYY'));
  };

  const CustomInput = forwardRef(({ onClick }, ref) => {
    const [displayDate, setDisplayDate] = useState(
      moment(selectedDate).format('DD.MM.yyyy')
    );

    useEffect(() => {
      setDisplayDate(moment(selectedDate).format('DD.MM.yyyy'));
    }, []);

    return (
      <button type="button" className={s.btn} onClick={onClick} ref={ref}>
        <CalendarIcon width="20" height="18" />
        {displayDate}
      </button>
    );
  });

  const renderCustomDayContents = (day, date, isSelected) => {
    const selectedValue = moment(selectedDate).startOf('day');
    const currentValue = moment(date).startOf('day');

    if (selectedValue.isSame(currentValue)) {
      return <div className={s.selectedDay}>{date.getDate()}</div>;
    }
    return <div className={s.day}>{date.getDate()}</div>;
  };

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        dateFormat={dateFormat}
        showMonthYearPicker={showMonthYearPicker}
        maxDate={maxDate}
        renderDayContents={renderCustomDayContents}
      />
    </>
  );
}
