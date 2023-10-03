import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const Content: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState({
      nickname: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '010-1234-5678',
      password: '********'
    });

  return (
    <ContentContainer>
    <div>Nickname: {userInfo.nickname}</div>
    <div>Email: {userInfo.email}</div>
    <div>Phone Number: {userInfo.phoneNumber}</div>
    </ContentContainer>
  );
};

export default Content;
