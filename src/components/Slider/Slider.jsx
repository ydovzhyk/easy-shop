import ImageGallery from 'react-image-gallery';
import React from 'react';
import s from './Slider.module.scss';
import client from '../../images/slider/client.jpg';
import kids from '../../images/slider/kids.jpg';
import cosmetics from '../../images/slider/cosmetics.jpg';
import store from '../../images/slider/cosmetics.jpg';
import man from '../../images/slider/man.jpg';
import men from '../../images/slider/men.jpg';
import beauty from '../../images/slider/beauty.jpg';
import women from '../../images/slider/women.jpg';
import shopManeken from '../../images/slider/shop-maneken.jpg';

const array = [
  { src: client, alt: 'client' },
  { src: kids, alt: 'kids' },
  { src: cosmetics, alt: 'cosmetics' },
  { src: store, alt: 'store' },
  { src: man, alt: 'man' },
  { src: men, alt: 'men' },
  { src: beauty, alt: 'beauty' },
  { src: women, alt: 'women' },
  { src: shopManeken, alt: 'shop-maneken' },
];
const sliderImages = array.map(item => ({
  original: `${item.src}`,
  thumbnail: `${item.alt}`,
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
