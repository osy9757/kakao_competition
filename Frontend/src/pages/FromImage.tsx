import React, { useState, useEffect, useRef } from 'react';
import ImageDisplay from '../components/pages/service/ImageDisplay';
import ResultImages from '../components/pages/service/ResultImages';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled('div')`
    display: grid;
    grid-template-rows: auto auto;
    gap: 20px;  
    width: 100vw;
    height: auto;
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

const MainPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(1);
    const [mainImage, setMainImage] = useState<string | null>(`/img${currentImageIndex}.jpg`);
    const [resultImages, setResultImages] = useState<ImageResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const API_URL = "http://43.202.138.58:8000/kyh/";

    const transformAPIResponse = (apiResponse: any): ImageResult[] => {
        const results: ImageResult[] = [];
        for (let i = 1; i <= 3; i++) {
            const item = apiResponse[i];
            if (item) {
                let jsonData: any = {};
                try {
                    if (item.json_data && item.json_data.trim() !== "") {
                        jsonData = JSON.parse(item.json_data);
                    }
                } catch (error) {
                    console.error(`Failed to parse json_data for item ${i}:`, error);
                }

                const description = jsonData.name || "No description available";
                const idx = jsonData.idx || null;
                const lng = jsonData.lng || null;
                const lat = jsonData.lat || null;
                const overview = jsonData.overview || "No overview available";

                results.push({
                    imageUrl: item.image,
                    heatmapUrl: item.heatmap,
                    description: description,
                    idx: idx,
                    lng: lng,
                    lat: lat,
                    overview: overview
                });
            }
        }
        return results;
    };

    useEffect(() => {
    const interval = setInterval(() => {
        // mainImage가 기본 이미지일 경우에만 이미지 인덱스를 업데이트
        if (mainImage === `/img${currentImageIndex}.jpg`) {
            setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
            setMainImage(`/img${currentImageIndex}.jpg`);
        }
    }, 5000);
    return () => clearInterval(interval);
}, [currentImageIndex, mainImage]);

    const handleLike = () => {
        setMainImage(`/img${currentImageIndex}.jpg`);
        callAPI(`/img${currentImageIndex}.jpg`);
    };

    const callAPI = async (imgPath: string) => {
        setIsLoading(true);

        try {
            const response = await fetch(imgPath);
            const imageBlob = await response.blob();

            const formData = new FormData();
            formData.append('files', imageBlob, imgPath);

            const apiResponse = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (apiResponse.status === 200) {
                const transformedResults = transformAPIResponse(apiResponse.data);
                setResultImages(transformedResults);
            } else {
                console.error(`Error occurred: ${apiResponse.status} - ${apiResponse.data}`);
            }
        } catch (error) {
            console.error(`Error occurred: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setMainImage(fileURL);
            callAPI(fileURL);
        }
    };

    const handleSkip = () => {
        setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
        setMainImage(`/img${currentImageIndex}.jpg`);
    };

    return (
        <PageContainer>
            <ImageDisplay
                imageUrl={mainImage || '/img1.jpg'}
                onLike={handleLike}
                onCamera={handleCamera}
                onSkip={handleSkip}
                disabled={isLoading}
            />
            <input
                type="file"
                ref={fileInputRef}
                accept=".jpg, .png"
                style={{ display: 'none' }}
                onChange={handleFileSelected}
            />
            {resultImages.length > 0 && <ResultImages results={resultImages} />}
        </PageContainer>
    );
}

export default MainPage;
