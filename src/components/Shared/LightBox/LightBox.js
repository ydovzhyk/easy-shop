import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import s from 'components/Shared/LightBox/LightBox.module.scss';

const LightBox = ({
  children,
  src,
  alt,
  imagesArray,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState(src);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const showImage = () => {
    setImageToShow(src);
    toggleIsOpen();
    document.body.style.overflow = 'hidden';
  };

  const hideLightBox = () => {
    toggleIsOpen();
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
     document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen ]);

  const showPrev = e => {
    e.stopPropagation();
    const currentIndex = imagesArray?.indexOf(imageToShow);
    setImageToShow(
      imagesArray[(currentIndex - 1 + imagesArray.length) % imagesArray.length]
    );
  };

  const showNext = e => {
    e.stopPropagation();
    const currentIndex = imagesArray?.indexOf(imageToShow);
    setImageToShow(imagesArray[(currentIndex + 1) % imagesArray.length]);
  };

  return (
    <div onClick={showImage} className={s.imagesWrapper}>
      {children}
      {isOpen ? (
        <div className={s.photoBackdrop} onClick={hideLightBox}>
          <button className={s.closeButton} onClick={hideLightBox}>
            x
          </button>
          <div
            className={`${s.arrowButton} ${s.arrowButtonLeft}`}
            onClick={showPrev}
          >
            <FiChevronLeft
              size={60}
              strokeWidth={1}
              className={s.arrowlinkLeft}
            />
          </div>

          <div className={s.photoContainer}>
            <img src={imageToShow} alt={alt} />
          </div>

          <div
            className={`${s.arrowButton} ${s.arrowButtonRight}`}
            onClick={showNext}
          >
            <FiChevronRight
              size={60}
              strokeWidth={1}
              className={s.arrowlinkRigth}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LightBox;
