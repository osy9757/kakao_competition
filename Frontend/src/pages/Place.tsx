import { useParams } from "react-router-dom";
import { PLACEINRFO } from "../components/pages/place/PlaceInfo";
import "../components/pages/place/Place.css";
import { PLACEMAP } from "../components/pages/place/PlaceMap";

const Place = () => {
  // 여행지 이름을 parameter로 가져오기
  // or 여행지 좌표 등등 여행지 정보기반의 parameter로 설정
  const { id } = useParams();

  return (
    <div className="tourplace">
      여행지 표시 페이지 Query Parameter기반 {id}
      <PLACEINRFO />
      <PLACEMAP />
    </div>
  );
};

export default Place;
