import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate  } from 'react-router-dom';

const ResultContainer = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3개의 컬럼
    gap: 20px; // 각 그리드 아이템 간의 간격
    width: 80%; // 전체 너비 설정
    margin: 0 auto; // 중앙 정렬
`;

const ResultItem = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 300px; // 이미지 너비 설정
        height: 400px; // 이미지 높이 설정
        border-radius: 10px; // 이미지 모서리 둥글게
        margin-bottom: 10px;
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
    const navigate = useNavigate();

    const handleDetailsClick = (imageUrl: string, description: string) => {
        navigate('/place', { state: { imageUrl, description } });
    }

    return (
        <ResultContainer>
            {results.map((result, idx) => (
                <ResultItem key={idx}>
                    <ImageWithHover imageUrl={result.imageUrl} heatmapUrl={result.heatmapUrl} />
                    <p>{result.description}</p>
                    <button onClick={() => handleDetailsClick(result.imageUrl, result.description)}>자세히 알아보기</button>
                </ResultItem>
            ))}
        </ResultContainer>
    );
}

const ImageWithHover: React.FC<{ imageUrl: string; heatmapUrl: string }> = ({ imageUrl, heatmapUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    const fullImageUrl = `https://first333.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;
    const fullHeatmapUrl = `data:image/jpeg;base64,${heatmapUrl}`;  
    return (
        <img 
            src={isHovered ? fullHeatmapUrl : fullImageUrl} 
            alt="Result Image" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        />
    );
}

export default ResultImages;
