import { useParams } from "react-router-dom";
import { PLACEINRFO } from "../components/pages/place/PlaceInfo";
import "../components/pages/place/Place.css";
import { PLACEMAP } from "../components/pages/place/PlaceMap";
import { COMMENTS } from "../components/pages/place/Comments";
import { useLocation } from 'react-router-dom';


const Place = () => {  
  const params = useParams<{ idx: string }>();
  const storedDataStr = localStorage.getItem(`place_${params.idx}`);
  if (!storedDataStr) {
      return <div>Error</div>;
  }

  const storedData = JSON.parse(storedDataStr).data;
  const { imageUrl, heatmapUrl, description, idx, lng, lat, overview } = storedData;

  
  return (
    <div className="tourplace">
      <div>
          <p><strong>Image URL:</strong> {imageUrl}</p>
          {/* <p><strong>Heatmap URL:</strong> {heatmapUrl}</p> */}
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Index (idx):</strong> {idx}</p>
          <p><strong>Longitude (lng):</strong> {lng}</p>
          <p><strong>Latitude (lat):</strong> {lat}</p>
          <p><strong>Overview:</strong> {overview}</p>
      </div>
      <PLACEINRFO />
      <PLACEMAP />
      <COMMENTS />
    </div>
  );
};

export default Place;
