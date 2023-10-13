import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UserInfoContainer = styled('div')`
  padding: 20px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  font-family: Arial, sans-serif;
`;

const InfoRow = styled('div')`
  margin-bottom: 15px;
  font-size: 16px;
`;

const LabelRow = styled('div')`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const InputBox = styled('input')`
  padding: 5px;
  padding-right: 30px; 
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
  position: relative;
`;

const EyeButton = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
`;

const EditButton = styled('button')`
  padding: 8px 15px;
  background-color: skyblue;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
`;

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '010-1234-5678',
    password: '********'
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const API_ENDPOINT = 'backend_url';
    axios.get(API_ENDPOINT)
      .then((response) => {
        const data = response.data;
        setUserInfo({
          nickname: data.nickname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: '********' // Mock
        });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <UserInfoContainer>
      <InfoRow>
        <LabelRow>Nickname:</LabelRow>
        <InputRow>
          <InputBox value={userInfo.nickname} readOnly />
        </InputRow>
      </InfoRow>
      <InfoRow>
        <LabelRow>Email:</LabelRow>
        <InputRow>
          <InputBox value={userInfo.email} readOnly />
        </InputRow>
      </InfoRow>
      <InfoRow>
        <LabelRow>Phone Number:</LabelRow>
        <InputRow>
          <InputBox value={userInfo.phoneNumber} readOnly />
        </InputRow>
      </InfoRow>
      <InfoRow>
        <LabelRow>Password:</LabelRow>
        <InputBox type={showPassword ? 'text' : 'password'} value={'real_password'} readOnly />
        <EyeButton onClick={togglePasswordVisibility}>
          {showPassword ? '🙈' : '👁️'}
        </EyeButton>
      </InfoRow>
      <EditButton>Edit</EditButton>
    </UserInfoContainer>
  );
};

export default UserInfo;
