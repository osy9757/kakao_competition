import React, { useState, useEffect, useRef  } from 'react';
import ImageDisplay from '../components/pages/service/ImageDisplay';
import SelectedImage from '../components/pages/service/SelectedImages';
import ResultImages from '../components/pages/service/ResultImages';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled('div')`
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 20px;  
    width: 100vw;
    height: auto;
`;

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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const API_URL = "http://43.202.138.58:8000/kyh/";

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
        }, 5000);
        return () => clearInterval(interval); // 컴포넌트 언마운트 시, 인터벌을 정리
    }, []);
    
    const handleLike = async () => {
        // 1. Like를 누른 이미지를 설정합니다.
        setSelectedImage(`/img${currentImageIndex}.jpg`);
        
        const mockResultImages: ImageResult[] = [
            {
                imageUrl: "/img1.jpg",
                heatmapUrl: "/img4.jpg",
                description: "Image 1 Description"
            },
            {
                imageUrl: "/img2.jpg",
                heatmapUrl: "/img5.jpg",
                description: "Image 2 Description"
            },
            {
                imageUrl: "/img3.jpg",
                heatmapUrl: "/img6.jpg",
                description: "Image 3 Description"
            }
        ];
        setResultImages(mockResultImages);
        
    
        // try {
        //     const formData = new FormData();
        //     formData.append('image', `/img${currentImageIndex}.jpg`); // 현재 이미지의 경로
    
        //     const response = await axios.post(API_URL, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
    
        //     const data = response.data;
        //     const imagesData = Object.entries(data)
        //         .filter(([key, _]) => key !== 'received')
        //         .map(([, value]) => value as ImageResult);
            
        //     setResultImages(imagesData); 
        // } catch (error) {
        //     console.error("Error uploading image:", error);
        // }
    };

    const handleCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setSelectedImage(fileURL);
        }

        const mockResultImages: ImageResult[] = [
            {
                imageUrl: "/img1.jpg",
                heatmapUrl: "/img4.jpg",
                description: "Image 1 Description"
            },
            {
                imageUrl: "/img2.jpg",
                heatmapUrl: "/img5.jpg",
                description: "Image 2 Description"
            },
            {
                imageUrl: "/img3.jpg",
                heatmapUrl: "/img6.jpg",
                description: "Image 3 Description"
            }
        ];
        setResultImages(mockResultImages);
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
            <input 
                type="file" 
                ref={fileInputRef} 
                accept=".jpg, .png" 
                style={{ display: 'none' }}
                onChange={handleFileSelected}
            />
            {selectedImage && <SelectedImage imageUrl={selectedImage} description={imageDescription} />}
            {resultImages.length > 0 && <ResultImages results={resultImages} />}
        </PageContainer>
    );
}

export default MainPage;
