import React, { useState } from 'react';

import Text from 'components/Shared/Text/Text';

import s from './SizeHovered.module.scss';

const SizeHovered = ({ size }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log('size', size);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      //   className={`${s.styleSizeHovered} ${isHovered ? s.hovered : ''}`}
      className={`size-hovered ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {size.map(item => (
        <Text text={item[0].name} textClass="after-title-bigger" />
      ))}
    </div>
  );
};

export default SizeHovered;
