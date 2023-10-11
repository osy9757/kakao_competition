import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const StyledImage = styled('img')`
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: flex;
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
    button {
        margin: 0 5px;
    }
`;

interface ImageDisplayProps {
    onSkip: () => void;
    onLike: () => void;
    onCamera: () => void;
    imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ onSkip, onLike, onCamera, imageUrl }) => {
    return (
        <ImageContainer>
            <StyledImage src={imageUrl} alt="Display Image" />
            <ImageButtons>
                <button onClick={onLike}>Like</button>
                <button onClick={onCamera}>Camera</button>
                <button onClick={onSkip}>Skip</button>
            </ImageButtons>
        </ImageContainer>
    );
}

export default ImageDisplay;
