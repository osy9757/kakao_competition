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

type category = "CE7" | "FD6" | "AT4" | "PK6" | "SW8" | "AD5" | "";

type CategoryItem = {
  name: string;
  code: category;
};
const categoryData: CategoryItem[] = [
  { name: "카페", code: "CE7" },
  { name: "음식점", code: "FD6" },
  { name: "관광명소", code: "AT4" },
  { name: "주차장", code: "PK6" },
  { name: "지하철역", code: "SW8" },
  { name: "숙박", code: "AD5" },
];

type mapProps = {
  name: string;
  lat: number;
  lng: number;
};

export const PLACEMAP = (props: mapProps) => {
  const [info, setInfo] = useState<MarkerType | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [map, setMap] = useState<any | null>(null);

  const [showMarkers, setShowMarkers] = useState(false);

  // PK6 주차장, SW8 지하철역, AT4 관광명소, AD5 숙박, FD6 음식점, CE7 카페
  const [category, setCategory] = useState<category>("");

  const handleCategoryClick = (code: category) => {
    // 이미 선택된 카테고리가 다시 선택되면
    if (category === code) {
      setCategory(""); // 카테고리 상태를 초기화합니다.
      setShowMarkers(false); // 마커를 숨깁니다.
    } else {
      setCategory(code);
      setShowMarkers(true); // 버튼 클릭 시 마커를 표시합니다.
    }
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places(map);

    ps.categorySearch(
      category,
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
      { x: props.lat, y: props.lng, useMapBounds: true }
    );
  }, [map, category]);

  console.log(markers);

  return (
    <div className="placemap">
      <div className="keyword_btn_wrapper">
        {categoryData.map((cat) => (
          <button
            key={cat.code}
            className="categorybutton"
            onClick={() => handleCategoryClick(cat.code)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <Map
        center={{ lat: props.lat, lng: props.lng }}
        style={{ width: "100%", height: "360px" }}
        onCreate={setMap}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: props.lat, lng: props.lng }}>
          <div style={{ color: "#000" }}>{props.name}</div>
        </MapMarker>
        {showMarkers &&
          markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
      </Map>
    </div>
  );
};
