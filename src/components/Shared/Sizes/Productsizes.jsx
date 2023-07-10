import Text from 'components/Shared/Text/Text';
import s from 'components/ProductCard/ProductCard.module.scss';
import { nanoid } from '@reduxjs/toolkit';

const ProductSizes = ({ sizes, text }) => {
const transformedSizes= sizes
    ? sizes.map(item => item[0].value)
    : [];
  // console.log('transformedSizes', transformedSizes);
  return (
    <div>
      <Text text={text} textClass="productLabels" />
      {transformedSizes.length > 1
        ? transformedSizes.map(item => {
            return (
              <div className={s.size} key={nanoid()}>
                <Text
                  text={`EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`}
                  textClass="after-title-bigger"
                />
              </div>
            );
          })
        : transformedSizes.map(item => {
            return (
              <div className={s.size} key={nanoid()}>
                <Text
                  text={
                    item[0].EU
                      ? `EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`
                      : `${Object.keys(item[0])} `
                  }
                  textClass="after-title-bigger"
                />
              </div>
            );
          })}
    </div>
  );
};

export default ProductSizes;
