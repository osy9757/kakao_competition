import { useParams } from "react-router-dom";
import { PLACEINRFO } from "../components/pages/place/PlaceInfo";
import "../components/pages/place/Place.css";
import { PLACEMAP } from "../components/pages/place/PlaceMap";
import { COMMENTS } from "../components/pages/place/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";

const Place = () => {
  // const location = useLocation();
  // const { imageUrl, heatmapUrl, description, idx, lng, lat, overview } = location.state;

  const { placeName } = useParams<{ placeName?: string }>();

  const [placeInfo, setPlaceinfo] = useState({
    name: "여행지 이름",
    description: "여행지 정보",
    lat: 35.15319327,
    lng: 129.11897609,
    img: "/img2.jpg",
    heatmapImg: "/img3.jpg",
  });

  useEffect(() => {
    if (!placeName) return; // 조건부 실행은 여기서 처리합니다.

    const fetchPlaceInfo = async () => {
      const formData = new FormData();
      formData.append("name", placeName);

      try {
        const response = await axios.post(
          "http://43.202.138.58:8000/kyh/info/",
          formData
        );

        const heatmapImg = sessionStorage.getItem(placeName) ?? "";
        if (response.data) {
          setPlaceinfo({
            name: response.data.name,
            description: response.data.overview,
            lat: response.data.lat,
            lng: response.data.lng,
            img: response.data.image,
            heatmapImg: heatmapImg,
          });
        }
      } catch (error) {
        console.error("여행지 정보를 불러오지 못하였습니다!!", error);
      }
    };

    fetchPlaceInfo();
  }, [placeName]);

  if (!placeName) {
    return <div>Error: Place name not provided!</div>;
  }

  return (
    <div className="tourplace">
      {/* <div>
          <p><strong>Image URL:</strong> {imageUrl}</p>
          <p><strong>Heatmap URL:</strong> {heatmapUrl}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Index (idx):</strong> {idx}</p>
          <p><strong>Longitude (lng):</strong> {lng}</p>
          <p><strong>Latitude (lat):</strong> {lat}</p>
          <p><strong>Overview:</strong> {overview}</p>
      </div> */}
      <PLACEINRFO
        name={placeInfo.name}
        info={placeInfo.description}
        img={placeInfo.img}
        heatmapImg={placeInfo.heatmapImg}
      />
      <PLACEMAP name={placeInfo.name} lat={placeInfo.lat} lng={placeInfo.lng} />
      <COMMENTS />
    </div>
  );
};

export default Place;
