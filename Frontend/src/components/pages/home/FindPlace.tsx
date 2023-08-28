import { useState } from "react";

const FindPlace = () => {
  // 여행지 소개 text
  const tourText: string = "천년의 시간을 가진 역사의 도시 경주 여행";

  // 검색 input text
  const [searchText, setSearchText] = useState<string>("");
  // 검색 input handeler
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  // 여행 이미지
  const [tourImg, setTourImg] = useState("/img1.jpg");

  return (
    <div className="findplace">
      <div className="placecontainer">
        <div className="left">
          <p className="tourinfo">{tourText}</p>
          <hr
            style={{
              border: "4px solid white",
              borderRadius: "5px",
              marginLeft: "50%",
              backgroundColor: "#D7E7EF",
            }}
          ></hr>
          <div className="searchcontainer">
            <input
              type="text"
              className="placesearch"
              placeholder="가고싶은 여행지를 검색해 보세요."
              onChange={inputHandler}
            />
            <button className="searchbtn">Search</button>
          </div>
        </div>
        <div className="right">
          <img src={tourImg} className="tourimg"></img>
        </div>
      </div>
    </div>
  );
};

export default FindPlace;
