import { Fragment, useState } from "react";
import axios from "axios";
import { SignUp2Props } from "../../../lib/types/signup";
import { useNavigate } from "react-router-dom";

const SignUp2: React.FC<SignUp2Props> = ({
  onClick,
  phoneNumber,
  setPhoneNumber,
}) => {
  // 전화번호 정규식
  const phoneNumberRegex = /^010\d{8}$/;

  // 인증번호 보냈을 때만 공개
  const [verify, setVerify] = useState<boolean>(true);
  const [verifyInput, setVerifyInput] = useState<string>();
  const [verifyCode, setVerifyCode] = useState<string>();

  // 인증번호 check
  const [verifyErr, setVerifyErr] = useState(false);

  // 휴대폰번호 inputChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };

  // 인증번호 InputChnage
  const handleverifyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVerifyInput(e.target.value);
  };

  // 인증 번호 전송 버튼 Click
  const verifyClick = () => {
    if (typeof phoneNumber === "string") {
      if (!phoneNumberRegex.test(phoneNumber)) {
        window.alert("전화번호를 확인해 주세요!");
      } else {
        axios(" http://192.168.45.178:8080/app/send", {
          method: "post",
          headers: {
            "Content-Tye": "application/json",
          },
          data: { phoneNumber: phoneNumber },
        }).then((res) => {
          console.log(verifyCode);
          setVerify(true);
          setVerifyCode(res.data.verifyCode);
        });
      }
    } else {
      window.alert("전화번호를 입력해 주세요!");
    }
  };

  // 인증번호 확인
  const verifyCheck = () => {
    console.log("veriyCode: ", verifyCode);
    console.log("verifyCheck: ", verifyInput);
    if (verifyCode?.toString() === verifyInput) {
      onClick();
    } else {
      setVerifyErr(true);
    }
  };

  // nav
  const navigate = useNavigate();

  return (
    <div className="step2">
      <div className="step2text">
        <h2
          style={{
            margin: "40px 0 50px 0",
            fontSize: "25px",
            fontFamily: "sans-serif",
          }}
        >
          휴대폰 본인 확인
        </h2>
      </div>
      <div className="step2phone">
        <label>휴대폰 번호</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <a href="https://www.flaticon.com/free-icons/contact" title="contact icons">Contact icons created by Muhamad Ulum - Flaticon</a> */}
          <input
            type="text"
            name="tel"
            value={phoneNumber}
            pattern="[0-9]+"
            maxLength={11}
            onChange={handleInputChange}
            placeholder="휴대폰 번호를 입력해주세요."
            disabled={verify}
            className="step2number"
          />
          <button onClick={verifyClick} className="verifybtn">
            {!verify ? "인증번호 전송" : "재전송"}
          </button>
        </div>
        {verify ? (
          <div className="verifyform">
            <label>인증번호</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <a href="https://www.flaticon.com/free-icons/privacy" title="privacy icons">Privacy icons created by Muhamad Ulum - Flaticon</a> */}
              <input
                type="text"
                placeholder="인증번호를 입력해주세요"
                value={verifyInput}
                onChange={handleverifyChange}
                maxLength={6}
                className="step2code"
              />
              <button onClick={verifyCheck} className="verifybtn">
                인증
              </button>
            </div>
            {verifyErr ? (
              <p style={{ color: "red" }}>인증번호를 확인해주세요.</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <button
          onClick={onClick}
          className="nextbtn"
          style={{ margin: "30px 25px 0 25px" }}
        >
          다음
        </button>
      </div>
      <div className="to_login">
        <p>이미 회원이신가요?</p>
        <p onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
          로그인
        </p>
      </div>
    </div>
  );
};

export default SignUp2;
