import { Controller } from 'react-hook-form';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import s from './Checkout.module.scss';

const FormField = ({
  labelText,
  controllerName,
  fieldName,
  control,
  register,
}) => {
  return (
    <div className={s.formField}>
      <Text text={labelText} textClass="productHeadings" />
      <Controller
        control={control}
        name={controllerName}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextField
            className="addOrder"
            value={value}
            control={control}
            handleChange={onChange}
            {...field[fieldName]}
            required={true}
            {...register(`${controllerName}`, {
              required: "Обов'язково до заповнення",
              //   pattern: {
              //     value: /^\+?3?8?[0-9]{10}/,
              //     message: 'Приклад номеру : +380993453451',
              //   },
            })}
          />
        )}
      />
    </div>
  );
};

export default FormField;