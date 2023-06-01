import ImageGallery from 'react-image-gallery';
import React from 'react';
import s from './Slider.module.scss';

const array = [
  'client',
  'kids',
  'cosmetics',
  'store',
  'man',
  'beauty',
  'men',
  'women',
  'shop-maneken',
];
const sliderImages = array.map(item => ({
  original: `/images/slider/${item}.jpg`,
  thumbnail: `/images/slider/${item}.jpg`,
  originalClass: [s.image],
  bulletClass: [s.bullet],
}));

const options = {
  lazyLoad: true,
  showThumbnails: false,
  showFullscreenButton: false,
  showBullets: true,
  showPlayButton: false,
  //   autoPlay: true,
  slideInterval: 4000,
  additionalClass: [s.gallery],
};

const Slider = () => {
    return (
      <ImageGallery items={sliderImages} {...options} className={s.gallery} />
    );
};

export default Slider;