import React from 'react';
import styled from 'styled-components';

const UserInfoContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const UserInfo: React.FC = () => {

  return (
    <UserInfoContainer>
      <div>TermsofService</div>
    </UserInfoContainer>
  );
};

export default UserInfo;
