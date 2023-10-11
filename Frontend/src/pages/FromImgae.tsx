import React, { useState, useEffect } from 'react';
import ImageDisplay from '../components/pages/service/ImageDisplay';
import SelectedImage from '../components/pages/service/SelectedImages';
import ResultImages from '../components/pages/service/ResultImages';
import styled from 'styled-components';

const PageContainer = styled('div')`
    display: grid;
    grid-template-rows: auto auto auto;
    padding: 20px;
    width: 100vw;
    height: 100vh;
`;


const API_ENDPOINT = "ENDPOINT"; // 임시로 설정한 백엔드 API 엔드포인트

interface ImageResult {
  imageUrl: string;
  heatmapUrl: string;
  description: string;
}

const MainPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageDescription, setImageDescription] = useState<string>("");
    const [resultImages, setResultImages] = useState<ImageResult[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
        }, 5000);
        return () => clearInterval(interval); // 컴포넌트 언마운트 시, 인터벌을 정리
    }, []);
    
    const handleLike = async () => {
        // 이미지를 백엔드 API로 전송하고 결과를 받아옵니다.
        // 아래는 예시 코드입니다. 실제 API 호출을 위해 axios 등의 라이브러리가 필요합니다.
        /*
        const response = await axios.post(API_ENDPOINT, { image: selectedImage });
        if (response.data) {
            setSelectedImage(response.data.received);
            setResultImages(response.data.results);
            // 이미지 설명도 설정합니다.
        }
        */
    };

    const handleCamera = () => {
        // 카메라 혹은 파일 첨부 기능 구현
        // 예: <input type="file" accept=".jpg, .png" onChange={...} />
    };

    const handleSkip = () => {
        setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
    };

    return (
        <PageContainer>
            <ImageDisplay 
                imageUrl={`/img${currentImageIndex}.jpg`} 
                onLike={handleLike} 
                onCamera={handleCamera} 
                onSkip={handleSkip} 
            />
            {selectedImage && <SelectedImage imageUrl={selectedImage} description={imageDescription} />}
            {resultImages.length > 0 && <ResultImages results={resultImages} />}
        </PageContainer>
    );
}

export default MainPage;
