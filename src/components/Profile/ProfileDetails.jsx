import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';
import Value from './Value';
import s from './Profile.module.scss';

const ProfileDetails = ({ children, className, to, value }) => {
    return (
        <NavLink
            className={className}
            to={to}
        >
            {children}
            <Value className={s.rightvalue}>{value}</Value>
        </NavLink>
    )
}

ProfileDetails.propTypes = {
    children: PropTypes.string,
    className: PropTypes.string,
    to: PropTypes.string,
    value: PropTypes.number,
}

ProfileDetails.defaultProps = {
    className: '',
    children: '',
    to: '/',
    value: 0,
}
export default ProfileDetails;