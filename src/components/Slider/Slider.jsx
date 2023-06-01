import ImageGallery from 'react-image-gallery';
import React from 'react';
// import Container from 'components/Shared/Container';
import s from './Slider.module.scss';
// import imgs1 from '../../images/slider/client.jpg';
// import imgs2 from '../../images/slider/kids.jpg';
// import imgs3 from '../../images/slider/cosmetics.jpg';
// import imgs4 from '../../images/slider/store.jpg';
// import imgs5 from '../../images/slider/man.jpg';
// import imgs6 from '../../images/slider/beauty.jpg';
// import imgs7 from '../../images/slider/men.jpg';
// import imgs8 from '../../images/slider/women.jpg';
// import imgs9 from '../../images/slider/shop-maneken.jpg';
// import imgs10 from '../../images/slider/t-shirt.jpg';

// const images = [
//   {
//     original: imgs1,
//     thumbnail: imgs1,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs2,
//     thumbnail: imgs2,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs3,
//     thumbnail: imgs3,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs4,
//     thumbnail: imgs4,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs5,
//     thumbnail: imgs5,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs6,
//     thumbnail: imgs6,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs7,
//     thumbnail: imgs7,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs8,
//     thumbnail: imgs8,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs9,
//     thumbnail: imgs9,
//     originalClass: [s.image],
//   },
//   {
//     original: imgs10,
//     thumbnail: imgs10,
//     originalClass: [s.image],
//   },
// ];

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
      // <Container>
      <ImageGallery items={sliderImages} {...options} className={s.gallery} />
      // </Container>
    );
};

export default Slider;