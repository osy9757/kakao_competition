import React, { useState } from "react";
import Dropdown from "./Dropdown";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "../../styles/common/Header.css";

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/main">어서와</a>
      </div>

      <ul className={`navbar__menu ${menuActive ? "active" : ""}`}>
        <li>
          <a href="/main">홈</a>
        </li>
        <li className="dropdown">
          <a href="#">여행지 찾기</a>
          <div className="dropdown-options">
            <a href="/fromimage">이미지로 찾기</a>
            <a href="/fromtext">텍스트로 찾기</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="#">로그인</a>
          <div className="dropdown-options">
            <a href="/login">로그인</a>
            <a href="/signup">회원가입</a>
            <a href="/findpwd">
              아이디<br></br>비밀번호찾기
            </a>
          </div>
        </li>
      </ul>

      <a href="#" className="navbar__toggleBtn" onClick={toggleMenu}>
        ☰
      </a>
    </nav>
  );
};

export default Header;
