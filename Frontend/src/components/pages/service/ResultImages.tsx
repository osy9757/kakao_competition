import React, { useState } from 'react';
import styled from 'styled-components';

const ResultContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ResultItem = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    img {
        margin-bottom: 5px;
    }
`;

interface ImageResult {
    imageUrl: string;
    heatmapUrl: string;
    description: string;
}

interface ResultImagesProps {
    results: ImageResult[];
}

const ResultImages: React.FC<ResultImagesProps> = ({ results }) => {
    return (
        <ResultContainer>
            {results.map((result, idx) => (
                <ResultItem key={idx}>
                    <ImageWithHover imageUrl={result.imageUrl} heatmapUrl={result.heatmapUrl} />
                    <p>{result.description}</p>
                </ResultItem>
            ))}
        </ResultContainer>
    );
}

const ImageWithHover: React.FC<{ imageUrl: string; heatmapUrl: string }> = ({ imageUrl, heatmapUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <img 
            src={isHovered ? heatmapUrl : imageUrl} 
            alt="Result Image" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        />
    );
}

export default ResultImages;
