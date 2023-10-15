import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB

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
    idx: number;
    lng: number;
    lat: number;
    overview: string;
}

interface ResultImagesProps {
    results: ImageResult[];
}

const ResultImages: React.FC<ResultImagesProps> = ({ results }) => {
    const navigate = useNavigate();

    const handleDetailsClick = (result: ImageResult) => {
        try {
            const item = {
                data: result,
                timestamp: new Date().getTime()
            };

            localStorage.setItem(`place_${result.idx}`, JSON.stringify(item));
        } catch (e) {
            if (e instanceof DOMException && e.code === 22) {
                const keys: string[] = [];
                for (let i = 0; i < localStorage.length; i++) {
                    keys.push(localStorage.key(i) as string);
                }

                keys.sort((a, b) => {
                    const itemA = JSON.parse(localStorage.getItem(a) as string);
                    const itemB = JSON.parse(localStorage.getItem(b) as string);
                    return itemA.timestamp - itemB.timestamp;
                });

                while (keys.length && JSON.stringify(localStorage).length >= MAX_STORAGE_SIZE) {
                    localStorage.removeItem(keys.shift() as string);
                }

                // Retry saving after clearing old data
                handleDetailsClick(result);
            } else {
                console.error('LocalStorage Error:', e);
            }
        }

        navigate(`/place/${result.idx}`);
    }

    return (
        <ResultContainer>
            {results.map((result, idx) => (
                <ResultItem key={idx}>
                    <ImageWithHover imageUrl={result.imageUrl} heatmapUrl={result.heatmapUrl} />
                    <p>{result.description}</p>
                    <button onClick={() => handleDetailsClick(result)}>자세히 알아보기</button>
                </ResultItem>
            ))}
        </ResultContainer>
    );
}

const ImageWithHover: React.FC<{ imageUrl: string; heatmapUrl: string }> = ({ imageUrl, heatmapUrl }) => {
    const [isHovered, setIsHovered] = useState(false);

    const fullImageUrl = `${imageUrl}`;
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
