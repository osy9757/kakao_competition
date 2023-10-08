import axios from "axios";
import Loading from "../components/common/Loading";
import { useNavigate } from "react-router-dom";
import "../styles/pages/LoginHandler.css";
import { useDispatch } from "react-redux";
import { kakaologin, kakaoSlice } from "../lib/redux/store";
import { useEffect } from "react";

const LoginHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const dispatch = useDispatch();

  const kakaoLogin = () => {
    const param = { code: code };
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_RE_URL}`,
      params: param,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res.data);
        localStorage.setItem("token", res.data.tokenInfo.accessToken);
        // flag확인하하고 route설정하고  카카오 로그인 true로 변경
        // flag: true 회원가입페이지로 이동
        if (res.data.flag) {
          dispatch(kakaoSlice.actions.kakaologin(true));
          navigate("/signup", { replace: true });
        } else {
          // db에 데이터가 저장돼있는 경우
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("effect 실행");
    kakaoLogin();
  }, [code]);

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
