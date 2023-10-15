import React from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/types/redux";


const ImageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100vh;
`;

const StyledImage = styled('img')`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`;

const ImageButtons = styled('div')`
    margin-top: 10px;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;


const StyledButton = styled('button')`
    margin: 0 5px;
    padding: 8px 15px;
    border: none;
    border-radius: 25px;
    background-color: #FFFFFF;
    color: #000000;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: #f7f7f7;
    }

    &:disabled {
        background-color: #e0e0e0; 
        color: #a0a0a0; 
    }
`;

interface ImageDisplayProps {
    onSkip: () => void;
    onLike: () => void;
    onCamera: () => void;
    imageUrl: string;
    disabled: boolean;
    
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ onSkip, onLike, onCamera, imageUrl, disabled }) => {    
  const isLogin = useSelector((state: RootState) => state.login.value);

  const handleLikeClick = () => {
    if (isLogin) {
        onLike();
    } else {
        window.alert("로그인 후 사용 가능합니다!");
    }
  };

const handleCameraClick = () => {
    if (isLogin) {
        onCamera();
    } else {
        window.alert("로그인 후 사용 가능합니다!");
    }
  };

  return (
    <ImageContainer>
        <StyledImage src={imageUrl} alt="Display Image" />
        <ImageButtons>
            <StyledButton onClick={handleLikeClick} disabled={disabled}>Like</StyledButton>
            <StyledButton onClick={handleCameraClick} disabled={disabled}>📷</StyledButton>
            <StyledButton onClick={onSkip}>Skip</StyledButton>
        </ImageButtons>
    </ImageContainer>
);
}

export default ImageDisplay;
