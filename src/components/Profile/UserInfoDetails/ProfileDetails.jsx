import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';
import Value from '../Value';
import s from './UserInfoDetails.module.scss';

const ProfileDetails = ({ children, to, value, addValue}) => {
    
    const getClassName = ({ isActive }) => { 
    return isActive ? `${s.navlink} ${s.active}` : `${s.navlink}`;
    };
    
    
    return (
        <NavLink
            className={getClassName }
            to={to}
        >
            {children}
            {addValue &&
                <Value className={s.rightvalue}>{value}</Value>}
        </NavLink>
    )
}

ProfileDetails.propTypes = {
    children: PropTypes.string,
    to: PropTypes.string,
    value: PropTypes.number,
    addValue: PropTypes.bool,
}

ProfileDetails.defaultProps = {
    children: '',
    to: '/',
    value: 0,
    addValue: false,
}
export default ProfileDetails;