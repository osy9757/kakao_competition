import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
`;

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState({
    nickname: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '010-1234-5678',
    password: '********'
  });

  // TODO: Add logic to handle user info update

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
