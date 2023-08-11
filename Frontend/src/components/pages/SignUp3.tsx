import React, { useState } from "react";
import { SignUp3Props } from "../../lib/types/signup";

const SignUp3: React.FC<SignUp3Props> = ({ phoneNumber, checkboxes }) => {
  // 회원가입 폼
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    nicekName: "",
    phoneNumber: phoneNumber,
    agree1: checkboxes.checkbox3,
    agree2: checkboxes.checkbox4,
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

  return (
    <div className="step3">
      <h2>어서와 한국은 처음이지</h2>
      <p>회원가입</p>
      <form>
        <div>
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
        <div>
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
        <div>
          <p>비밀번호 확인</p>
          <input
            type="password"
            id="passwor"
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
        <div>
          <p>닉네임</p>
          <input
            type="text"
            id="nicekName"
            placeholder="닉네임을 입력해 주세요."
            value={signUpForm.nicekName}
            onChange={handleInputChange}
          />
          <button>중복확인</button>
        </div>
      </form>
      <button>회원가입</button>
    </div>
  );
};

export default SignUp3;
