import { nanoid } from '@reduxjs/toolkit';
import Text from 'components/Shared/Text/Text';
import CountBlock from 'components/Basket/CountBlock/CountBlock';
import s from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect.module.scss';

const SizesWithoutSelect = ({
  sizes,
  text,
  price,
  onDecrement,
  onIncrement,
  id,
}) => {
  const transformedSizes = sizes
    ? sizes.map(item => {
        const sizeId = item.name;
        const value = item.value;
        const quantity = item.quantity;
        return { sizeId, value, quantity };
      })
    : [];

  return (
    <div className={s.wrapper}>
      <div className={s.secondaryWrapper}>
        <Text text={text} textClass="productLabels" />
        <ul className={s.menuGroupList}>
          {transformedSizes.map(item => {
            return (
              <li className={s.sizeAndCountWrapper} key={nanoid()}>
                <div className={s.size}>
                  <Text
                    text={
                      item.value[0].EU
                        ? `EU: ${item.value[0].EU} / UA: ${item.value[1].UA} / IN: ${item.value[2].IN}`
                        : `${item.sizeId}`
                    }
                    textClass="after-title-bigger"
                  />
                </div>
                <CountBlock
                  number={item.quantity}
                  price={price}
                  onMinus={() => onDecrement(id, item.sizeId)}
                  onPlus={() => onIncrement(id, item.sizeId)}
                  id={item.sizeId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SizesWithoutSelect;
