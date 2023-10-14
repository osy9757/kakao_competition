import { useParams } from "react-router-dom";
import { PLACEINRFO } from "../components/pages/place/PlaceInfo";
import "../components/pages/place/Place.css";
import { PLACEMAP } from "../components/pages/place/PlaceMap";
import { COMMENTS } from "../components/pages/place/Comments";
import { useLocation } from 'react-router-dom';


const Place = () => {  
  const location = useLocation();
  const { imageUrl, description } = location.state;
  
  return (
    <div className="tourplace">
      <PLACEINRFO />
      <PLACEMAP />
      <COMMENTS />
    </div>
  );
};

export default Place;
