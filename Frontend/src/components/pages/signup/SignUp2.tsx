import { Fragment, useState } from "react";
import axios from "axios";
import { SignUp2Props } from "../../../lib/types/signup";

const SignUp2: React.FC<SignUp2Props> = ({
  onClick,
  phoneNumber,
  setPhoneNumber,
}) => {
  // 전화번호 정규식
  const phoneNumberRegex = /^010\d{8}$/;

  // 인증번호 보냈을 때만 공개
  const [verify, setVerify] = useState<boolean>(false);
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

  return (
    <div className="step2">
      <h2>휴대폰 본인 확인</h2>
      <p>원활한 서비스 제공을 위해, 휴대폰 번호를 입력해주세요.</p>
      <label>휴대폰 번호</label>
      <div>
        <input
          type="text"
          name="tel"
          value={phoneNumber}
          pattern="[0-9]+"
          maxLength={11}
          onChange={handleInputChange}
          placeholder="전화번호를 입력해주세요."
          disabled={verify}
        />
        <button onClick={verifyClick}>
          {!verify ? "인증번호 전송" : "재전송"}
        </button>
      </div>
      {verify ? (
        <div className="verifyform">
          <label>인증번호</label>
          <div>
            <input
              type="text"
              placeholder="인증번호를 입력해주세요"
              value={verifyInput}
              onChange={handleverifyChange}
              maxLength={6}
            />
            <button onClick={verifyCheck}>인증</button>
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
      <button onClick={onClick}>step이동</button>
    </div>
  );
};

export default SignUp2;
