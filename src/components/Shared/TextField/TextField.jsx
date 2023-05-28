import s from './TextField.module.scss';

const TextField = ({
  type,
  name,
  value,
  handleChange,
  placeholder,
  required,
  pattern,
  title,
  classLabel = 'label',
  classInput = 'input',
  classSpan = 'span',
}) => {
  return (
    <label className={s[classLabel]}>
      <input
        className={s[classInput]}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        pattern={pattern}
        title={title}
      />
      <span className={s[classSpan]}>{placeholder}</span>
    </label>
  );
};
export default TextField;

TextField.defaultProps = {
  type: 'text',
  required: false,
};
