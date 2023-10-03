import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";

import { useState, useEffect } from "react";

type MarkerType = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

export const PLACEMAP = () => {
  const [info, setInfo] = useState<MarkerType | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState<any | null>(null);

  const [showMarkers, setShowMarkers] = useState(false);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places(map);

    ps.categorySearch(
      "CE7",
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: parseFloat(data[i].y),
                lng: parseFloat(data[i].x),
              },
              content: data[i].place_name,
            });
            bounds.extend(
              new kakao.maps.LatLng(
                parseFloat(data[i].y),
                parseFloat(data[i].x)
              )
            );
          }

          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      },
      { x: 35.15319327, y: 129.11897609, useMapBounds: true }
    );
  }, [map]);

  console.log(markers);

  return (
    <div className="placemap">
      <div className="keyword_btn_wrapper">
        <button onClick={() => setShowMarkers((prev) => !prev)}>카페</button>
      </div>
      <Map
        center={{ lat: 35.15319327, lng: 129.11897609 }}
        style={{ width: "100%", height: "360px" }}
        onCreate={setMap}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: 35.15319327, lng: 129.11897609 }}>
          <div style={{ color: "#000" }}>광안리 해수욕장</div>
        </MapMarker>
        {showMarkers &&
          markers.map(
            (
              marker // showMarkers가 true일 때만 마커를 보여줍니다
            ) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => setInfo(marker)}
              >
                {info && info.content === marker.content && (
                  <div style={{ color: "#000" }}>{marker.content}</div>
                )}
              </MapMarker>
            )
          )}
      </Map>
    </div>
  );
};
