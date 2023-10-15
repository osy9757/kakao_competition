import React, { useState } from 'react';
import '../../styles/common/Header.css';

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/main">Service_Name</a>
      </div>


      <div className="navbar__center">
        <ul className={`navbar__menu ${menuActive ? 'active' : ''}`}>
          <li><a href="/main">Home</a></li>
          <li><a href="/main">About</a></li>
          <li className='dropdown'>
            <a href="/fromimage">Service</a>
          </li>         
        </ul>
      </div>

      <div className="navbar__right">
        <ul className={`navbar__menu ${menuActive ? 'active' : ''}`}>
          <li className='dropdown'>
            <a href="#">Login</a>
            <div className='dropdown-options'>
              <a href="/login">로그인</a>
              <a href="/signup">회원가입</a>
              <a href="/findpwd">아이디<br></br>비밀번호찾기</a>
            </div>
          </li>
          <li className='dropdown'>
            <a href="#">Signin</a>
            <div className='dropdown-options'>
              <a href="/login">로그인</a>
              <a href="/signup">회원가입</a>
              <a href="/findpwd">아이디<br></br>비밀번호찾기</a>
            </div>
          </li>
        </ul>
      </div>

      <a href="#" className="navbar__toggleBtn" onClick={toggleMenu}>☰</a>
    </nav>
  );
};

export default Header;
