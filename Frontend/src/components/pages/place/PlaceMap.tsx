import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";

export const PLACEMAP = () => {
  return (
    <div className="placemap">
      <div className="keyword_btn_wrapper">
        <button>카페</button>
      </div>
      <Map
        center={{ lat: 35.15319327, lng: 129.11897609 }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: 35.15319327, lng: 129.11897609 }}>
          <div style={{ color: "#000" }}>광안리 해수욕장</div>
        </MapMarker>
      </Map>
    </div>
  );
};
