import React, { useState, Fragment } from "react";

const CardImagChanger: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  // 이미지 인덱스
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 버튼 클릭 handler
  const clickhandler = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Fragment>
      <img src={images[currentImageIndex]} alt="img" className="changeimage" />
      <button className="overlaybutton" onClick={clickhandler}>
        버튼
      </button>
    </Fragment>
  );
};

export default CardImagChanger;
