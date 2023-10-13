import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const ContentContainer = styled('div')`
  padding: 16px;
  border: 1px solid #ccc;
  border: none;  
  border-radius: 8px;  
  background-color: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;

const ProfilePicture = styled('div')`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #ccc;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
`;

const CameraIcon = styled('label')`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #B2BCBA;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px #fff;
`;

const FileInput = styled('input')`
  display: none;
`;

const InfoContainer = styled('div')`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Logo = styled('span')`
  margin-right: 10px;
`;

const LogoutButton = styled('button')`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: skyblue;
  color: #FFFFFF;
  cursor: pointer;
`;

const Content: React.FC = () => {

  const [userInfo, setUserInfo] = React.useState({
    img: '/img1.jpg',
    nickname: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '010-1234-5678',
    password: '********'
  });


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUserInfo({
            ...userInfo,
            img: reader.result
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <ContentContainer>
      <ProfilePicture style={{ backgroundImage: `url(${userInfo.img})` }}>
        <CameraIcon htmlFor="imageInput">📷</CameraIcon>
        <FileInput id="imageInput" type="file" onChange={handleImageChange} />
      </ProfilePicture>
      <div>{userInfo.nickname}</div>
      <InfoContainer>
        <Logo>📧</Logo>
        <div>{userInfo.email}</div>
      </InfoContainer>
      <InfoContainer>
        <Logo>📱</Logo>
        <div>{userInfo.phoneNumber}</div>
      </InfoContainer>
      <LogoutButton>Logout</LogoutButton>
    </ContentContainer>
  );
};

export default Content;






