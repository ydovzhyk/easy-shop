import PropTypes from 'prop-types';

const DaysValue = ({ value, className }) => {
    function formatDays(count) {
        if (count === 0) {
    return "0 днів";
  } else if (count === 1) {
    return "1 день";
  } else if (count >= 2 && count <= 4) {
    return count + " дні";
  } else if (count >= 5 && count <= 20) {
    return count + " днів";
        } else if (count >= 21) {
            const lastDigit = count % 10;
            if (lastDigit === 1) {
                return count + " день";
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return count + " дні";
            } else if (lastDigit >= 5 && lastDigit <= 9) {
                return count + " днів";
            } else return count + " днів";
  } else return count + " днів";
    };

    return (<p className={className}>{formatDays(value)}</p>);
}

DaysValue.propTypes = {
    value: PropTypes.number,
    className: PropTypes.string,
}

DaysValue.defaultProps = {
    value: 0,
    className: '',
}

export default DaysValue;