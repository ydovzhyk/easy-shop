import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Value from 'components/Profile/Value';
import s from 'components/Profile/ProfileLink/ProfileLink.module.scss';

const ProfileLink = ({ children, to, value, addValue, isBackgroundChange }) => {
    return (
        <NavLink
            className={s.navlink}
            to={to}
            style={() => {
                return {
                    background: isBackgroundChange ? "var(--bg-footer-header)" : "inherit"
                }
            }}
        >
            {children}
            {addValue &&
                <Value className={s.rightvalue}>{value}</Value>}
        </NavLink>
    )
}

ProfileLink.propTypes = {
    children: PropTypes.string,
    to: PropTypes.string,
    value: PropTypes.number,
    addValue: PropTypes.bool,
    isBackgroundChange: PropTypes.bool,
}

ProfileLink.defaultProps = {
    children: '',
    to: '/',
    value: 0,
    addValue: false,
    isBackgroundChange: false,
}
export default ProfileLink;