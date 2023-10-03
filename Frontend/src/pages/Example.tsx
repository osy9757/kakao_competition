import axios from "axios";
import HamburgerButton from "../components/common/HamburgerButton";
import { MULTIPLEMARKER } from "../components/pages/place/MultipleMarker";

const Example = () => {
  const clickHandle = () => {
    axios(" http://192.168.45.178:8080/app/send", {
      method: "post",
      headers: {
        "Content-Tye": "application/json",
      },
      data: { phoneNumber: "01094276462" },
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      {/* 반응형 nav에 사용할 버튼입니다. */}
      <HamburgerButton />
      <button onClick={clickHandle}>문자</button>

      <MULTIPLEMARKER />
    </div>
  );
};

export default Example;
