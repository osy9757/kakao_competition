import { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";

type MarkerType = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

export const MULTIPLEMARKER = () => {
  const [info, setInfo] = useState<MarkerType | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState<any | null>(null);

  const [showMarkers, setShowMarkers] = useState(false);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places(map);

    ps.keywordSearch("맛집", (data, status, _pagination) => {
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
            new kakao.maps.LatLng(parseFloat(data[i].y), parseFloat(data[i].x))
          );
        }

        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
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
      <button onClick={() => setShowMarkers((prev) => !prev)}>
        마커 보여주기
      </button>
    </div>
  );
};
