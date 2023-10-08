import { useState } from "react";
import SignUp1 from "../components/pages/signup/SignUp1";
import SignUp2 from "../components/pages/signup/SignUp2";
import SignUp3 from "../components/pages/signup/SignUp3";

import "../styles/pages/SignUp.css";
import { useSelector } from "react-redux";

const SignUp = () => {
  console.log("check")
  // 화면전환 step  / 약관동의 -> 번호인증 -> 회원가입 Form
  const [step, setStep] = useState<number>(1);

  // step 넘어가기
  const nextStep = (): void => {
    setStep((prevStep) => prevStep + 1);
  };

  // checkbox 상태
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false, // 서비스 이용 현황 기록
    checkbox4: false, // 마케팅 알림 수신 동의 (email)
  });

  // 전화번호
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  // step에 따른 화면 변경
  switch (step) {
    case 1:
      return (
        <div className="signup">
          <SignUp1
            onClick={nextStep}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
        </div>
      );
    case 2:
      return (
        <div className="signup">
          <SignUp2
            onClick={nextStep}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            checkboxes={checkboxes}
          />
        </div>
      );
    case 3:
      return (
        <div className="signup">
          <SignUp3 checkboxes={checkboxes} phoneNumber={phoneNumber} />
        </div>
      );
    default:
      return (
        <div className="signup">
          <SignUp1
            onClick={nextStep}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
        </div>
      );
  }
};

export default SignUp;
