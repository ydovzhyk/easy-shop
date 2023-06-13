import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import Value from '../Value';
import s from './UserInfoDetails.module.scss';

const ProfileLink = ({ children, to, value, addValue, state }) => {
    const getClassName = ({ isActive }) => { 
    return isActive ? `${s.navlink} ${s.active}` : `${s.navlink}`;
    };
    
    return (
        <NavLink
            className={getClassName }
            to={to}
            state
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
    state: PropTypes.object,
}

ProfileLink.defaultProps = {
    children: '',
    to: '/',
    value: 0,
    addValue: false,
}
export default ProfileLink;