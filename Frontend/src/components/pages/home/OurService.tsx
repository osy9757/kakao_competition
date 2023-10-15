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
        <hr
          className="hr_bar"
          style={{ border: "1.2px solid black", width: "20px" }}
        ></hr>
        <p>
          저희는 이미지 기반 유사도를 활용해 유사한 여행지 추천과 정보를
          제공합니다. <br />
          마음에 드는 여행지의 사진을 업로드 하거나, 랜덤한 이미지 중 '좋아요'를
          눌러 유사한 여행지를 추천받아 보세요.
          <br />
        </p>
      </div>
      <div className="servicerow">
        <img
          src="/our_service.png"
          alt="service heatmap"
          className="service_heatmap"
        />
      </div>
    </div>
  );
};

export default OurService;
