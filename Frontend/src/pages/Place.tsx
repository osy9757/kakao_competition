import { useParams } from "react-router-dom";

const Place = () => {
  const { id } = useParams();
  return <div>여행지 표시 페이지 Query Parameter기반 {id}</div>;
};

export default Place;
