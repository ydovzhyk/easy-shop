import PropTypes from 'prop-types';

const Value = ({children, className }) => {
    return (
        <span
            className={className}>
            {children}
        </span>
    )
}

Value.propTypes = {
    className: PropTypes.string,
    children:PropTypes.number,
}

Value.defaultProps = {
    className: '',
    children: 0,
}

export default Value;