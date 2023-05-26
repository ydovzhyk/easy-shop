import s from './FormInputFile.module.scss';

export default function FormInputFile({ register }) {
  return (
    <div className={s.box}>
      <label htmlFor="imageUpload" className={s.label}>
        Оберіть файли
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
        multiple
        {...register('files')}
      />
    </div>
  );
}
