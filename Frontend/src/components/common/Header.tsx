import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { push } from 'connected-react-router';
import { RootState } from "../../lib/types/redux";
import { useNavigate } from 'react-router-dom';

import '../../styles/common/Header.css';

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = useState(false);
  const isLogin = useSelector((state: RootState) => state.login.value);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
            <a href="/main">
              <span>어서와~여기는 처음이지?</span>
              <img src="/icon.png" alt="Logo Icon" />
            </a>
      </div>


      <div className="navbar__center">
        <ul className={`navbar__menu ${menuActive ? 'active' : ''}`}>
          <li><a onClick={() => navigate('/main')}>Home</a></li>
          <li><a href="/main">About</a></li>
          <li className='dropdown'>
            <a onClick={() => navigate('/fromimage')}>Service</a>
          </li>         
        </ul>
      </div>

      <div className="navbar__right">
        <ul className={`navbar__menu ${menuActive ? 'active' : ''}`}>
            {isLogin ? (
                <li className='dropdown' onClick={() => navigate('/userinfo')}>
                    <a>
                      <img src="/profile_icon.png" alt="Profile Icon" />
                    </a>
                    <div className='dropdown-options'>
                        <a onClick={() => navigate('/userinfo')}>로그아웃</a>
                        <a onClick={() => navigate('/userinfo')}>마이페이지</a>
                    </div>
                </li>
            ) : (
                <li className='dropdown'>
                    <a onClick={() => navigate('/login')}>Signin</a>
                    <div className='dropdown-options'>
                        <a onClick={() => navigate('/login')}>로그인</a>
                        <a onClick={() => navigate('/signup')}>회원가입</a>
                        <a onClick={() => navigate('/findpwd')}>아이디<br></br>비밀번호찾기</a>
                    </div>
                </li>
            )}
        </ul>
    </div>


      <a href="#" className="navbar__toggleBtn" onClick={toggleMenu}>☰</a>
    </nav>
  );
};

export default Header;
