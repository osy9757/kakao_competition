import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled('div')`
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const StyledImage = styled('img')`
    width: 100%;
    height: auto;
`;

const ButtonContainer = styled('div')`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
`;

const StyledButton = styled('button')`
    margin: 0 10px;
`;

interface HeaderImageProps {
    onSkip: () => void;
    onLike: (imageUrl: string) => void; 
    onCamera: () => void;
}


const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
];

const HeaderImage: React.FC<HeaderImageProps> = ({ onSkip, onLike, onCamera }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    }, []);

    const handleSkip = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
        onSkip();
    };

    const handleLikeClick = () => {
        onLike(images[currentIndex]);
    };

    return (
        <ImageContainer>
            <StyledImage src={images[currentIndex]} alt="Main Image" />
            <ButtonContainer>
                <StyledButton onClick={handleLikeClick}>Like</StyledButton>
                <StyledButton onClick={onCamera}>Camera</StyledButton>
                <StyledButton onClick={handleSkip}>Skip</StyledButton>
            </ButtonContainer>
        </ImageContainer>
    );
};

export default HeaderImage;
