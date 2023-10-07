import React, { useState } from "react";
import { SignUp3Props } from "../../../lib/types/signup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp3: React.FC<SignUp3Props> = ({ phoneNumber, checkboxes }) => {
  // 회원가입 폼
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    nickname: "",
    phoneNumber: phoneNumber,
    agree_info: checkboxes.checkbox3,
    agree_marketing: checkboxes.checkbox4,
  });
  const [pwdpwd, setPwdPwd] = useState<string>();

  // check
  const [emailCheck, setEmailCheck] = useState<Boolean>(false);
  const [passwordCheck, setPasswordCheck] = useState<Boolean>(false);
  const [pwdpwdCheck, setPwdPwdCheck] = useState<Boolean>(false);

  // 에레메세지
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [pwdMessage, setPwdMessage] = useState<string>("");
  const [pwdCheckMessage, setpwdCheckMessage] = useState<string>("");

  // Regex
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pwdRegex: RegExp =
    /^(?=.*[a-zA-Z])(?=.*[~!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  // input text 변경시
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setSignUpForm({ ...signUpForm, [id]: value });

    // 이메일 경우
    if (id === "email") {
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
    }
    // 비밀번호 경후
    if (id === "password") {
      if (!pwdRegex.test(value)) {
        setPasswordCheck(true);
        setPwdMessage("영문, 숫자, 특수문자를 포함한 이루어진 8~15자");
      } else {
        setPasswordCheck(false);
      }
    }
  };

  const pwdpwdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPasswordConfirmation = e.target.value;
    setPwdPwd(newPasswordConfirmation);

    if (newPasswordConfirmation !== signUpForm.password) {
      setPwdPwdCheck(true);
      setpwdCheckMessage("비밀번호가 일치하지 않습니다.");
      console.log(signUpForm.password);
      console.log(newPasswordConfirmation);
    } else {
      setPwdPwdCheck(false);
    }
  };

  // nav
  const navigate = useNavigate();

  // 회원가입
  const signUpHandler = () => {
    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_BE_API}/users/signup`,
      data: signUpForm,
    })
      .then((res) => {
        alert("회원가입 성공!");
        navigate("/login");
        console.log("회원가입 성공!");
      })
      .catch((err) => {
        //  err 로직 설정
        console.log(err);
      });
  };

  console.log(signUpForm);

  return (
    <div className="step3">
      <div className="step3text">
        <h2
          style={{
            margin: "40px 0 50px 0",
            fontSize: "25px",
            fontFamily: "sans-serif",
          }}
        >
          회원가입
        </h2>
      </div>
      <div className="step3form">
        <div className="step3inputdiv">
          <p>이메일</p>
          <input
            type="text"
            id="email"
            placeholder="이메일 주소를 입력해 주세요."
            value={signUpForm.email}
            onChange={handleInputChange}
          />
          {emailCheck ? (
            <p className="checkmessage">{emailMessage}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="step3inputdiv">
          <p>비밀번호</p>
          <input
            type="password"
            id="password"
            placeholder="영문, 숫자, 특수문자 조합으로 이루어진 8~15자"
            value={signUpForm.password}
            onChange={handleInputChange}
          />
          {passwordCheck ? (
            <p className="checkmessage">{pwdMessage}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="step3inputdiv">
          <p>비밀번호 확인</p>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요."
            value={pwdpwd}
            onChange={pwdpwdChange}
          />
          {pwdpwdCheck ? (
            <p className="checkmessage">{pwdCheckMessage}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="step3inputdiv">
          <p>닉네임</p>
          <div className="step3nick">
            <input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해 주세요."
              value={signUpForm.nickname}
              onChange={handleInputChange}
            />
            <button className="nicknamecheckbtn">중복확인</button>
          </div>
        </div>
        <button
          className="nextbtn"
          style={{ marginLeft: "15px" }}
          onClick={signUpHandler}
        >
          회원가입
        </button>
      </div>
      <div className="to_login_step3">
        <p>이미 회원이신가요?</p>
        <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          로그인
        </p>
      </div>
    </div>
  );
};

export default SignUp3;
