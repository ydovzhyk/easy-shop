import { useState, forwardRef } from 'react';
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

  const formattedValue = value.toString();

  const [selectedDate, setSelectedDate] = useState(new Date(formattedValue));
  // const [selectedDate, setSelectedDate] = useState(value);
  console.log(selectedDate);

  const handleDateChange = date => {
    console.log('Date after', date);
    // Форматуємо вибрану дату у потрібний формат 'MM.dd.yyyy'
    const formattedDate = moment(date).format('MM.dd.yyyy');
    setSelectedDate(date);
    handleChange(formattedDate);
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={s.btn} onClick={onClick} ref={ref}>
      <CalendarIcon width="20" height="18" />
      {value}
    </button>
  ));

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        dateFormat={dateFormat}
        showMonthYearPicker={showMonthYearPicker}
        maxDate={maxDate} // Використовуємо змінну `maxDate`
      />
    </>
  );
}

// export default function Calendar({
//   dateFormat = 'MM.dd.yyyy',
//   showMonthYearPicker,
//   value,
//   handleChange,
// }) {
//   const currentDate = new Date();
//   const maxDate = new Date();
//   maxDate.setMonth(currentDate.getMonth() + 6);

//   console.log('value', value);
//   // const [selectedDate, setSelectedDate] = useState(
//   //   moment(value, 'YYYY-M-D').format('MM.dd.yyyy')
//   // );
//   const [selectedDate, setSelectedDate] = useState(new Date(value));
//   // const [selectedDate, setSelectedDate] = useState(
//   //   moment(value).format('MM/DD/yyyy')
//   // );
//   console.log('Це дата', selectedDate);

//   const handleDateChange = date => {
//     const formattedDate = moment(date).format('MM.dd.yyyy');
//     setSelectedDate(formattedDate);
//     handleChange(formattedDate);
//   };

//   const CustomInput = forwardRef(({ value, onClick }, ref) => (
//     <button className={s.btn} onClick={onClick} ref={ref}>
//       <CalendarIcon width="20" height="18" />
//       {value}
//     </button>
//   ));

//   return (
//     <>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         customInput={<CustomInput />}
//         dateFormat={dateFormat}
//         showMonthYearPicker={showMonthYearPicker}
//         maxDate={maxDate}
//       />
//     </>
//   );
// }
