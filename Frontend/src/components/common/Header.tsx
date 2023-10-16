import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/types/redux";
import { useNavigate } from "react-router-dom";
import "../../styles/common/Header.css";

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const isLogin = useSelector((state: RootState) => state.login.value);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/main" onClick={(e) => handleClick(e, "/main")}>
          <span>어서와~여기는 처음이지?</span>
          <img src="/icon.png" alt="Logo Icon" />
        </a>
      </div>

      <div className="navbar__center">
        <ul className={`navbar__menu ${menuActive ? "active" : ""}`}>
          <li>
            <a href="/main" onClick={(e) => handleClick(e, "/main")}>
              Home
            </a>
          </li>
          <li>
            <a href="/main" onClick={(e) => handleClick(e, "/main")}>
              About
            </a>
          </li>
          <li className="dropdown">
            <a href="/fromimage" onClick={(e) => handleClick(e, "/fromimage")}>
              Service
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar__right">
        <ul className={`navbar__menu ${menuActive ? "active" : ""}`}>
          {isLogin ? (
            <li className="dropdown">
              <a href="/userinfo" onClick={(e) => handleClick(e, "/userinfo")}>
                <img src="/profile_icon.png" alt="Profile Icon" />
              </a>
              <div className="dropdown-options">
                <a
                  href="/userinfo"
                  onClick={(e) => handleClick(e, "/userinfo")}
                >
                  로그아웃
                </a>
                <a
                  href="/userinfo"
                  onClick={(e) => handleClick(e, "/userinfo")}
                >
                  마이페이지
                </a>
              </div>
            </li>
          ) : (
            <li className="dropdown">
              <a href="/login" onClick={(e) => handleClick(e, "/login")}>
                Signin
              </a>
              <div className="dropdown-options">
                <a href="/login" onClick={(e) => handleClick(e, "/login")}>
                  로그인
                </a>
                <a href="/signup" onClick={(e) => handleClick(e, "/signup")}>
                  회원가입
                </a>
                <a href="/findpwd" onClick={(e) => handleClick(e, "/findpwd")}>
                  아이디<br></br>비밀번호찾기
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>

      <a href="#" className="navbar__toggleBtn" onClick={toggleMenu}>
        ☰
      </a>
    </nav>
  );
};

export default Header;
