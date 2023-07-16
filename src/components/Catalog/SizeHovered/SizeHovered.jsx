import React from 'react';
import s from './SizeHovered.module.scss';


const SizeHovered = ({ sizes, activeSize }) => {

  const transformedSizes =
    activeSize !== null && sizes[activeSize] !== undefined
      ? sizes[activeSize][0].value
      : [];

  return (
    <div className={s.groupListHovering}>
      {transformedSizes.length > 1
        ? transformedSizes
            .map(obj => Object.entries(obj)[0].join(': '))
            .join(' / ')
        : null}

    </div>
  );
};

export default SizeHovered;
