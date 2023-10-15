import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/types/redux";

type placeInfoProp = {
  name: string;
  info: string;
  img: string;
  heatmapImg: string;
};

export const PLACEINRFO = (props: placeInfoProp) => {
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
        <h1>{props.name}</h1>
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
        <img
          src={`data:image/jpeg;base64,${props.heatmapImg}`}
          alt="placeimg1"
          className="placeimg1"
        />
        <img src={props.img} alt="placeimg2" className="placeimg2" />
      </div>
      <p className="palcetext">{props.info}</p>
    </div>
  );
};
