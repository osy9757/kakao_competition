import React, { useEffect } from "react";

const KakaoLogin: React.FC = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  const grant_type = "autorization_code";
  const client_id = process.env.REACT_APP_KAKAO_REST_API;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className="social_Login">
      <a href={auth_url}>
        <img
          src={process.env.PUBLIC_URL + `assets/kakao_web.png`}
          alt="kakao_login"
          style={{
            height: "35px",
            width: "290px",
            objectFit: "cover",
            borderRadius: "12px",
            marginTop: "10px",
          }}
        />
      </a>
    </div>
  );
};

export default KakaoLogin;
