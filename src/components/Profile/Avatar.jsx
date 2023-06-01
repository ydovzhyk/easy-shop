import PropTypes from 'prop-types';
import photo from "../../images/Avatar/Hansel.png"

const Avatar = ({
    src, alt, className, width, heigth, ...attrs }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            width={width}
            height={heigth}
            {...attrs}
        />
    );
};

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

Avatar.defaultProps = {
    src: {photo},
    alt: 'avatar',
    className: '',
    width: 72,
    height: 72,
}

export default Avatar;