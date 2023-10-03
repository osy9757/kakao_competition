import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UserInfoContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState({
    nickname: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '010-1234-5678',
    password: '********'
  });

  useEffect(() => {
    // API 엔드포인트 (이 부분은 실제 백엔드 엔드포인트로 수정해야 함)
    const API_ENDPOINT = 'backend_url';

    axios.get(API_ENDPOINT)
      .then((response) => {
        const data = response.data;
        setUserInfo({
          nickname: data.nickname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: '********' // 비밀번호는 보통 직접 노출되지 않으므로 마스킹 처리
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);


  return (
    <UserInfoContainer>
      <div>Nickname: {userInfo.nickname}</div>
      <div>Email: {userInfo.email}</div>
      <div>Phone Number: {userInfo.phoneNumber}</div>
      <div>Password: {userInfo.password}</div>
      <button>수정</button>
    </UserInfoContainer>
  );
};

export default UserInfo;
