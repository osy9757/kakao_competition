import axios from "axios";
import Loading from "../components/common/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/LoginHandler.css";

const LoginHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  // const kakaoLogin = async () => {
  //   await axios({
  //     method: "GET",
  //     url: `${process.env.REACT_APP_KAKAO_REDIRECT_URL}/?code=${code}`,
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //   }).then((res) => {
  //     //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
  //     console.log(res);

  //     // navigate("/main", { replace: true });
  //   });
  // };
  // kakaoLogin();

  return (
    <div className="loginhandler">
      <h1
        data-text="로그인 중입니다...."
        style={{ fontSize: 32 }}
        className="loadingtext"
      >
        로그인 중입니다....
      </h1>
      <Loading />
    </div>
  );
};

export default LoginHandler;
