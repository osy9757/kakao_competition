import { useState, useRef } from "react";
import axios from "axios";
import { SignUp2Props } from "../../../lib/types/signup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { kakaoSlice, loginSlice } from "../../../lib/redux/store";

const SignUp2: React.FC<SignUp2Props> = ({
  onClick,
  phoneNumber,
  setPhoneNumber,
  checkboxes,
}) => {
  // 전화번호 정규식
  const phoneNumberRegex = /^010\d{8}$/;

  // 인증번호 보냈을 때만 공개
  const [showVeriy, setShowVerify] = useState(false);
  const [verify, setVerify] = useState<boolean>(false);
  const [verifyInput, setVerifyInput] = useState<string>();
  const [verifyCode, setVerifyCode] = useState<string>();

  // 휴대폰 번호 input ref
  const phonInputRef = useRef<HTMLInputElement | null>(null);

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
        axios(`http://${process.env.REACT_APP_BE_API}/sms/send`, {
          method: "post",
          headers: {
            "Content-Tye": "application/json",
          },
          data: { to: phoneNumber },
        }).then((res) => {
          setVerifyCode(res.data.confirmNumber);
          if (phonInputRef.current) {
            phonInputRef.current.disabled = true;
          }
          setShowVerify(true);
        });
      }
    } else {
      window.alert("전화번호를 입력해 주세요!");
    }
  };

  // 인증번호 확인
  const verifyCheck = () => {
    if (verifyCode?.toString() === verifyInput?.toString()) {
      window.alert("인증이 완료되었습니다!");
      setVerify(true);
    } else {
      setVerifyErr(true);
    }
  };

  // nav
  const navigate = useNavigate();

  // 카카오 로그인 check
  // 나중에 type 지정 변경해야 함
  const kakaoCheck = useSelector((state: any) => state.kakao.value);

  const dispatch = useDispatch();

  // next_step 핸들러
  // 카카오 인 경우와 아닌 경우 설정
  const nextStepHandler = () => {
    if (verify) {
      if (kakaoCheck) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage.");
          return;
        }

        axios({
          method: "post",
          url: `http://${process.env.REACT_APP_BE_API}/login/aouth2/kakao`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            agree_info: checkboxes.checkbox3,
            agree_marketing: checkboxes.checkbox4,
            phoneNumber: phoneNumber,
          },
        })
          .then((res) => {
            alert("회원가입 성공!");
            navigate("/login");
            dispatch(kakaoSlice.actions.kakaologin(false));
            dispatch(loginSlice.actions.login);
          })
          .catch((err) => {
            //  err 로직 설정
            console.error(err);
          });
      } else {
        onClick();
      }
    } else {
      window.alert("인증을 완료해 주세요!");
    }
  };

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
            className="step2number"
            ref={phonInputRef}
          />
          <button onClick={verifyClick} className="verifybtn" disabled={verify}>
            {!showVeriy ? "인증번호 전송" : "재전송"}
          </button>
        </div>
        {showVeriy ? (
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
                disabled={verify}
              />
              <button
                onClick={verifyCheck}
                className="verifybtn"
                disabled={verify}
              >
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
          onClick={nextStepHandler}
          className="nextbtn"
          style={{ margin: "30px 25px 0 25px" }}
        >
          {kakaoCheck ? "정보 입력하기" : "다음"}
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
