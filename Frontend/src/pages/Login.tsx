import "../styles/pages/Login.css";

import LoginForm from "../components/pages/login/LoginFrom";
import KakaoLogin from "../components/pages/login/Kakao";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const to_find = (): void => {
    navigate("/findpwd");
  };
  const to_signup = (): void => {
    navigate("/signup");
  };

  return (
    <div className="sevice_login">
      <div className="login">
        <h1 style={{ color: "black", fontSize: "40px" }}> 로그인</h1>
        <LoginForm />
        <div className="find_signup">
          <span onClick={to_find} style={{ cursor: "pointer" }}>
            비밀번호 재설정
          </span>
          <span style={{ color: "gray" }}>|</span>
          <span onClick={to_signup} style={{ cursor: "pointer" }}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
