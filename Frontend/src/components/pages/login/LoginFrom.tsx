import "../../../styles/pages/LoginForm.css";

import React, { useState } from "react";
import { Login } from "../../../lib/types/login";

type login = Login;

const LoginForm: React.FC = () => {
  // 로그인 입력 폼
  const [loginForm, setLoginForm] = useState<login>({
    email: "",
    password: "",
  });

  // 로그인 폼 유효성 확인(boolean)
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [pwdCheck, setPwdCheck] = useState<boolean>(false);

  // 로그인 폼 유효성 확인에 따른 에러 메세지
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [pwdMessage, setPwdMessage] = useState<string>("");

  // eamil regex
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // input 변화에 따른 FormCheck
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });

    if (id === "email") {
      // email 확인
      if (!emailRegex.test(value)) {
        setEmailCheck(true);
        if (value === "") {
          setEmailMessage("이메일 주소를 입력해 주세요.");
        } else {
          setEmailMessage("이메일 주소를 확인해 주세요.");
        }
      } else {
        setEmailCheck(false);
      }
    } else if (id === "password") {
      // 비밀번호 확인
      if (value === "") {
        setPwdCheck(true);
        setPwdMessage("비밀번호를 입력해주세요.");
      } else {
        setPwdCheck(false);
      }
    }
  };

  return (
    <div className="loginform">
      <form>
        <div>
          <label>이메일</label>
          <input
            type="email"
            id="email"
            className="email"
            value={loginForm.email}
            onChange={handleInputChange}
            placeholder="이메일을 입력해주세요."
            required
          />
          {/* <a href="https://www.freepik.com/icon/email_542638">
            Icon by Freepik
          </a> */}
          {emailCheck ? (
            <p className="checkmessage">{emailMessage}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            id="password"
            className="password"
            value={loginForm.password}
            onChange={handleInputChange}
            required
            placeholder="비밀번호를 입력해주세요."
            minLength={8}
          />
          {/* <a href="https://www.freepik.com/icon/padlock_2889676">
            Icon by Freepik
          </a> */}
          {pwdCheck ? <p className="checkmessage">{pwdMessage} </p> : <p></p>}
        </div>
        <button type="submit" className="loginButton">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
