import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className='logo'>My Website</div>
            <nav className='nav'>
                <a href='#'>홈</a>
                <div className='travel-menu-container'>
                    <a href='#' className='travel-link'>여행지 찾기</a>
                    <div className='travel-menu'>
                        <a href='#'>서울</a>
                        <a href='#'>부산</a>
                        <a href='#'>대구</a>
                        {/* 여기에 더 많은 여행지 추가 가능 */}
                    </div>
                </div>
                <a href='#'>로그인</a>
            </nav>
        </header>
    );
};

export default Header;
