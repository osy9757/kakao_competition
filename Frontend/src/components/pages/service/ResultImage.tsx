import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    cursor: pointer;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    transition: opacity 0.3s;
    &:hover {
        opacity: 0;
    }
`;

const HoverImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 0.3s;
    &:hover {
        opacity: 1;
    }
`;

interface ResultImageProps {
    imageUrl: string; // 결과 이미지의 URL
    hoverImageUrl: string; // 마우스를 올렸을 때 보여줄 이미지의 URL
}

const ResultImage: React.FC<ResultImageProps> = ({ imageUrl, hoverImageUrl }) => {
    return (
        <ImageContainer>
            <StyledImage src={imageUrl} alt="Result Image" />
            <HoverImage src={hoverImageUrl} alt="Hover Image" />
        </ImageContainer>
    );
};

export default ResultImage;
