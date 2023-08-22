import React from "react";

const KakaoLogin: React.FC = () => {
  return (
    <div className="social_Login">
      <img src={process.env.PUBLIC_URL + `assets/kakao_web.png`} alt="web" />
    </div>
  );
};

export default KakaoLogin;
