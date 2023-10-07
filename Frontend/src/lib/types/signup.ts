export type SignUp1Props = {
  onClick: () => void;
  checkboxes: {
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    checkbox4: boolean;
  };
  setCheckboxes: React.Dispatch<
    React.SetStateAction<{
      checkbox1: boolean;
      checkbox2: boolean;
      checkbox3: boolean;
      checkbox4: boolean;
    }>
  >;
};

export type SignUp2Props = {
  onClick: () => void;
  phoneNumber: string | undefined;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string | undefined>>;
  checkboxes: {
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    checkbox4: boolean;
  };
};

export type SignUp3Props = {
  checkboxes: {
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
    checkbox4: boolean;
  };
  phoneNumber: string | undefined;
};
