import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/types/redux";

export const PLACEINRFO = () => {
  const isLogin = useSelector((state: RootState) => state.login.value);

  //  로그인 한 유저라면 여행지 좋아요 받아와야 함
  const [isLike, setIsLike] = useState(false);

  const toggleButtonClick = () => {
    if (isLogin) {
      setIsLike((prevChecked) => !prevChecked);
    } else {
      window.alert("로그인 후 사용 가능합니다!");
    }
  };

  return (
    <div className="placeinfo">
      <div className="placename">
        <h1>여행지 이름</h1>
        {/* 좋아요 버튼 handler 추가해야함 백엔드 연동 */}
        <button
          className={isLike ? "heart-button liked" : "heart-button"}
          onClick={toggleButtonClick}
        >
          <svg
            className="heart-icon"
            width="24"
            height="24"
            fill={isLike ? "red" : "none"}
            stroke={isLike ? "red" : "black"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="placeimg_wrapper">
        {/* alt는 여행지 이름을 받아와 수정 예정 */}
        <img src="/img2.jpg" alt="placeimg1" className="placeimg1" />
        <img src="/img3.jpg" alt="placeimg2" className="placeimg2" />
      </div>
      <p className="palcetext">
        한국·중국·일본 등 극동 지역의 중앙부에 있어 지정학적으로도 중요하며, 도
        전체가 바다로 둘러싸였다. 수리적(數理的)으로는 동경 126°08'∼126°58',
        북위 33°06'∼34°00'에 위치한다. 북단은 북위 34°00'의 제주시 추자면
        대서리이며, 남단은 북위 33°06'의 서귀포시 대정읍 마라도다. 한국 최남단에
        있는 도로서, 제주도를 포함해 9개의 유인도와 55개의 무인도로 이루어졌다.
        이 가운데 유인도는
        우도·상추자도·하추자도·비양도·횡간도·추포도·가파도·마라도이다. 남북 간의
        거리가 약 31㎞, 동서간의 거리가 약 73㎞로 동서로 가로놓인 모양이다.
        러시아·중국 등의 대륙과 일본·동남아 등지를 연결하는 요충지이며, 천혜의
        자연경관이 수려한 세계적인 휴양관광지다.
      </p>
    </div>
  );
};
