import CardImagChanger from "../../common/CardImageChanger";

const OurService = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  return (
    <div className="oursevice">
      <div className="servicetext">
        <h2 className="h2_service">Our Service</h2>
        <hr style={{ border: "1.2px solid black", width: "20px" }}></hr>
        <p>
          저희는 어쩌고 저쩌고 서비스를 제공합니다. <br />
          마음에 드는 여행지의 사진을 좋아요 어쩌고 저쩌고 <br />
          이미지 기반 여행지 추천~~~ <br />
          키워드 기반 여행지 추천~~~ <br />
          샬라샬라 설명
        </p>
      </div>
      <div className="servicerow">
        <div className="serviceimg">
          <CardImagChanger />
        </div>
        <div className="servicetext1">
          <h2>image based recommendation </h2>
          <p>
            사용자가 원하는 이미지를 좋아요 누르거나, 맘에 들지 않으면 skip을
            누르면 해당 내용을 기반으로 사용자 맞춤형 여행지를 추천해드립니다.
          </p>
        </div>
        <div className="servicetext2">
          <h2>keyword based recommendation</h2>
          <p>키워드 기반 추천은 용환님이 설명</p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
