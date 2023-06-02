import PropTypes from 'prop-types';
import { HiOutlineUserCircle } from "react-icons/hi";


// import photo from "../../../images/Avatar/Hansel.png"

const Avatar = ({
    src, alt, className, width, heigth, ...attrs }) => {
    return (
        src ?
        (<img
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={heigth}
            {...attrs}
            />) : (<HiOutlineUserCircle className={className } />)
    );
};

Avatar.propTypes = {
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

Avatar.defaultProps = {
    alt: 'avatar',
    className: '',
    width: 72,
    height: 72,
}

export default Avatar;