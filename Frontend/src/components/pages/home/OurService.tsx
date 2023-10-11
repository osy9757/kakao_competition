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
