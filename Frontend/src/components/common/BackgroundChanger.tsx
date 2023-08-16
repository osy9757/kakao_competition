import React, { useState, useEffect } from 'react';

interface Props {
  imageList: string[];
}

const BackgroundChanger: React.FC<Props> = ({ imageList }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageList]);

  return (
    <div
    style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1, 
      backgroundImage: `url(${imageList[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>
  );
};

export default BackgroundChanger;
