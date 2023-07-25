import PropTypes from 'prop-types';
import avatar from '../../../images/Avatar/avatar.svg';
import s from './Avatar.module.scss';

const Avatar = ({ src, alt, avatarClass, width, heigth, ...attrs }) => {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={s[avatarClass]}
      width={width}
      height={heigth}
      {...attrs}
    />
  ) : (
    <img src={avatar} alt="Avatar" className={s[avatarClass]} />
  );
};

Avatar.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  avatarClass: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Avatar.defaultProps = {
  alt: 'avatar',
  avatarClass: '',
  width: 72,
  height: 72,
};

export default Avatar;
