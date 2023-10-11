import React from 'react';
import styled from 'styled-components';

const SelectedImageContainer = styled('div')`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
        margin-right: 10px;
    }
`;
interface SelectedImageProps {
    imageUrl: string;
    description: string;
}

const SelectedImage: React.FC<SelectedImageProps> = ({ imageUrl, description }) => {
    return (
        <SelectedImageContainer style={{ display: 'flex', alignItems: 'center' }}>
            <img src={imageUrl} alt="Selected Image" />
            <p>{description}</p>
        </SelectedImageContainer>
    );
}

export default SelectedImage;
