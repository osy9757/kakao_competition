import React, { ChangeEvent } from "react";

import TermsInput from "../../../hooks/TermsInput";

import { SignUp1Props } from "../../../lib/types/signup";
import { useNavigate } from "react-router-dom";

const SignUp1: React.FC<SignUp1Props> = ({
  onClick,
  checkboxes,
  setCheckboxes,
}) => {
  // check 변경시 event
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  // 필수약관 동의 확인 후 다음 step이동
  const allCheckboxesChecked: boolean =
    checkboxes.checkbox1 && checkboxes.checkbox2;

  // 전체동의
  const allCheck = (): void => {
    if (
      checkboxes.checkbox1 &&
      checkboxes.checkbox2 &&
      checkboxes.checkbox3 &&
      checkboxes.checkbox4
    ) {
      setCheckboxes({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
      });
    } else {
      setCheckboxes({
        checkbox1: true,
        checkbox2: true,
        checkbox3: true,
        checkbox4: true,
      });
    }
  };

  // route
  const navigate = useNavigate();

  return (
    <div className="step1">
      <h2
        style={{
          alignSelf: "center",
          margin: "40px 0 50px 0",
          fontSize: "25px",
          fontFamily: "sans-serif",
        }}
      >
        약관 동의
      </h2>
      <div className="checkboxes">
        <label className="all_check">
          <input type="checkbox" onChange={allCheck} />
          전체 동의
        </label>
        <hr style={{ width: "230px" }} />
        <TermsInput
          value="이용약관 동의"
          name="checkbox1"
          check={checkboxes.checkbox1}
          option={true}
          handleCheckboxChange={handleCheckboxChange}
        />
        <TermsInput
          value="개인정보 수집 및 이용 동의"
          name="checkbox2"
          check={checkboxes.checkbox2}
          option={true}
          handleCheckboxChange={handleCheckboxChange}
        />
        <TermsInput
          value="개인정보 수집 및 이용 동의"
          name="checkbox3"
          check={checkboxes.checkbox3}
          option={false}
          handleCheckboxChange={handleCheckboxChange}
        />
        <TermsInput
          value="마케팅 알림 수신동의"
          name="checkbox4"
          check={checkboxes.checkbox4}
          option={false}
          handleCheckboxChange={handleCheckboxChange}
        />
        {allCheckboxesChecked ? (
          <button onClick={onClick} className="nextbtn">
            다음
          </button>
        ) : (
          <></>
        )}
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

export default SignUp1;
