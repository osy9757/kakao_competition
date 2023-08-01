import React, { useState } from 'react';
import Dropdown from './Dropdown';
import '../../styles/common/Header.css';

const Header: React.FC = () => {
  const [isTravelDropdownVisible, setTravelDropdownVisible] = useState(false);
  const [isLoginDropdownVisible, setLoginDropdownVisible] = useState(false);
  // 로그인 상태는 임시로 false로 설정합니다. 추후 변경 가능
  const isLoggedIn = false;

  return (
    <header className='header'>
      <div className='logo'>My Website</div>
      <nav className='nav'>
        <a href='/main'>홈</a>
        <div
          onMouseEnter={() => setTravelDropdownVisible(true)}
          onMouseLeave={() => setTravelDropdownVisible(false)}
        >
          <a href='#'>여행지 찾기</a>
          <div
            onMouseEnter={() => setTravelDropdownVisible(true)}
            onMouseLeave={() => setTravelDropdownVisible(false)}
          >
            <Dropdown visibility={isTravelDropdownVisible}>
              <a href='/fromtext'>텍스트</a>
              <a href='/fromimage'>이미지</a>
            </Dropdown>
          </div>
        </div>
        <div
          onMouseEnter={() => setLoginDropdownVisible(true)}
          onMouseLeave={() => setLoginDropdownVisible(false)}
        >
          <a href='#'>{isLoggedIn ? '마이페이지' : '로그인'}</a>
          <div
            onMouseEnter={() => setLoginDropdownVisible(true)}
            onMouseLeave={() => setLoginDropdownVisible(false)}
          >
            <Dropdown visibility={isLoginDropdownVisible}>
              {isLoggedIn ? (
                <>
                  <a href='/userinfo'>마이페이지</a>
                  <a href='/logout'>로그아웃</a>
                </>
              ) : (
                <>
                  <a href='/login'>로그인</a>
                  <a href='/findpwd'>아이디/비밀번호 찾기</a>
                  <a href='/signup'>회원가입</a>
                </>
              )}
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
