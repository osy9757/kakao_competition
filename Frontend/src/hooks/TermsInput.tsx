import React, { ChangeEvent } from "react";

interface TermsInputProps {
  value: string;
  name: string;
  check: boolean;
  option: boolean;
  handleCheckboxChange: { (e: ChangeEvent<HTMLInputElement>): void };
}

const TermsInput: React.FC<TermsInputProps> = ({
  value,
  name,
  check,
  option,
  handleCheckboxChange,
}) => {
  return (
    <div className="termcheckdiv">
      <label className="termcheck">
        <input
          type="checkbox"
          name={name}
          checked={check}
          onChange={handleCheckboxChange}
        />
        {value}
      </label>
      {option ? (
        <label style={{ color: "red" }}>(필수)</label>
      ) : (
        <label style={{ color: "#666666" }}>(선택)</label>
      )}
    </div>
  );
};

export default TermsInput;
