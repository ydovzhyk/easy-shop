import React, { useState, useEffect } from 'react';
import slideOne from '../../images/carusel/slide-1.jpg';
import slideTwo from '../../images/carusel/slide-2.jpg';
import slideThree from '../../images/carusel/slide-3.jpg';
import slideFour from '../../images/carusel/slide-4.jpg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import s from './Carusel.module.scss';

const images = [slideOne, slideTwo, slideThree, slideFour];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const renderPagination = () => {
    return (
      <div className={s.pagination}>
        <div className={s.paginationBox}>
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                opacity: index === currentIndex ? 1 : 0.3,
              }}
              className={s.paginationDot}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <div className={s.imageBox}>
        <div
          className={`${s.arrowButton} ${s.arrowButtonLeft}`}
          onClick={goToPreviousSlide}
        >
          <FiChevronLeft
            size={60}
            strokeWidth={1}
            className={s.arrowlinkLeft}
          />
        </div>
        {images.map((image, index) => (
          <img
            key={index}
            className={`${s.image} ${
              index === currentIndex ? s.currentImage : ''
            }`}
            src={image}
            alt="Carousel"
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          />
        ))}
        <div
          className={`${s.arrowButton} ${s.arrowButtonRight}`}
          onClick={goToNextSlide}
        >
          <FiChevronRight
            size={60}
            strokeWidth={1}
            className={s.arrowlinkRigth}
          />
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Carousel;
