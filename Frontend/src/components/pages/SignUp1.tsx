import React, { ChangeEvent } from "react";

import TermsInput from "../../hooks/TermsInput";

import { SignUp1Props } from "../../lib/types/signup";

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
  return (
    <div className="step1">
      약관동의
      <label>
        <input type="checkbox" onChange={allCheck} />
      </label>
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
      {allCheckboxesChecked ? <button onClick={onClick}>다음</button> : <></>}
    </div>
  );
};

export default SignUp1;
