import React from 'react';
import s from './FormInputFile.module.scss';

export default function FormInputFile({
  register,
  name,
  multiple,
  single,
  label,
  onChange,
}) {
  const handleFileChange = event => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={s.box}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <input
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
        {...register(name)}
        {...(multiple ? { multiple: true } : {})}
        {...(single ? { multiple: false } : {})}
        onChange={handleFileChange}
      />
    </div>
  );
}
// import React from 'react';
// import s from './FormInputFile.module.scss';

// export default function FormInputFile({ register, multiple, single, label }) {
//   return (
//     <div className={s.box}>
//       <label htmlFor="imageUpload" className={s.label}>
//         {label}
//       </label>
//       <input
//         type="file"
//         id="imageUpload"
//         accept="image/png, image/jpeg"
//         style={{ display: 'none' }}
//         {...register('files')}
//         {...(multiple ? { multiple: true } : {})}
//         {...(single ? { multiple: false } : {})}
//       />
//     </div>
//   );
// }
