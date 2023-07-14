import Text from 'components/Shared/Text/Text';
import s from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect.module.scss';
import { nanoid } from '@reduxjs/toolkit';

const SizesWithoutSelect = ({ sizes, text }) => {
  // console.log('sizes:', sizes);
  const transformedSizes= sizes
    ? sizes.map(item => item[0].value)
    : [];
  // console.log('transformedSizes', transformedSizes);
  return (
    <div>
      <Text text={text} textClass="productLabels" />
      <ul className={s.menuGroupList}>
        {transformedSizes.length > 1
        ? transformedSizes.map(item => {
            return (
              <li className={s.size} key={nanoid()}>
                <Text
                  text={`EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`}
                  textClass="after-title-bigger"
                />
              </li>
            );
          })
        : transformedSizes.map(item => {
            return (
              <li className={s.size} key={nanoid()}>
                <Text
                  text={
                    item[0].EU
                      ? `EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`
                      : `${Object.keys(item[0])} `
                  }
                  textClass="after-title-bigger"
                />
              </li>
            );
          })}
      </ul>
      
    </div>
  );
};

export default SizesWithoutSelect;
