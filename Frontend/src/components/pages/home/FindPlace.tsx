import { useState } from "react";

const FindPlace = () => {
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
          <div className="textwrapper">
            <p className="tourinfo">
              좋아하는 여행이 사진을 업로드하면 <br />
              비슷한 국내 여행지를 추천해드려요!!
            </p>
          </div>
          <div className="btnwrapper">
            <button className="searchbtn">국내 여행지 추천받기</button>
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
