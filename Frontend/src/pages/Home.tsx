import React from 'react';
import BackgroundChanger from '../components/common/BackgroundChanger';

const Home: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
];

  return <BackgroundChanger imageList={images} />;
};

export default Home;