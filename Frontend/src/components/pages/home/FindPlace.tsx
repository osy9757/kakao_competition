import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FindPlace = () => {
  // 여행 이미지
  const [tourImg, setTourImg] = useState("/img1.jpg");

  const imageList = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
  ];
  let imgIndex = 0;

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imgRef.current) {
        imgRef.current.style.opacity = "0";
      }

      imgIndex = (imgIndex + 1) % imageList.length;

      setTimeout(() => {
        setTourImg(imageList[imgIndex]);
        if (imgRef.current) {
          imgRef.current.style.opacity = "1";
        }
      }, 500); // 여기서 500ms는 CSS의 transition 시간과 동일해야 합니다.
    }, 5500); // 5초 + 0.5초(애니메이션 시간)마다 이미지 변경

    return () => clearInterval(intervalId); // 컴포넌트 언마운트될 때 interval 제거
  }, []);

  const navigate = useNavigate();
  const btnHandler = () => {
    navigate("/fromimage");
  };

  return (
    <div className="findplace">
      <div className="placecontainer">
        <div className="left">
          <div className="textwrapper">
            <p className="tourinfo">
              좋아하는 여행이 사진을 업로드하면 <br />
              비슷한 국내 여행지를 추천해드려요!!
            </p>
          </div>
          <div className="btnwrapper">
            <button className="searchbtn" onClick={btnHandler}>
              국내 여행지 추천받기
            </button>
          </div>
        </div>
        <div className="right">
          <img src={tourImg} className="tourimg" ref={imgRef}></img>
        </div>
      </div>
    </div>
  );
};

export default FindPlace;
