import "../style/pages/Login.css";

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
    <div className="login">
      <KakaoLogin />
      <p className="space_or">
        <span>또는</span>
      </p>
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
  );
};

export default Login;
