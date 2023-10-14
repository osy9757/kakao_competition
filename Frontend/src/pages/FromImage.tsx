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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const API_URL = "http://43.202.138.58:8000/kyh/";

    const transformAPIResponse = (apiResponse: any): ImageResult[] => {
        const results: ImageResult[] = [];
        for (let i = 1; i <= 3; i++) {
            const item = apiResponse[i];
            if (item) {
                let description = "No description available"; 
                try {
                    if (item.json_data && item.json_data.trim() !== "") {
                        description = JSON.parse(item.json_data).name;
                    }
                } catch (error) {
                    console.error(`Failed to parse json_data for item ${i}:`, error);
                }
                results.push({
                    imageUrl: item.image,
                    heatmapUrl: item.heatmap,
                    description: description
                });
            }
        }
        return results;
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex < 5 ? prevIndex + 1 : 1));
        }, 5000);
        return () => clearInterval(interval); // 컴포넌트 언마운트 시, 인터벌을 정리
    }, []);
    
    const handleLike = async () => {
        setIsLoading(true); 
        setSelectedImage(`/img${currentImageIndex}.jpg`);        
        
        const formData = new FormData();
        formData.append('files', `/img${currentImageIndex}.jpg`);

        try {
            const response = await fetch(`/img${currentImageIndex}.jpg`);
            const imageBlob = await response.blob();
    
            const formData = new FormData();
            formData.append('files', imageBlob, `img${currentImageIndex}.jpg`); 
    
            const apiResponse = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('apiResponse')
            console.log(apiResponse.data)
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
    };

    const handleCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true); 
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setSelectedImage(fileURL);
            
            const formData = new FormData();
            formData.append('files', file);
    
            try {
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
                disabled={isLoading}
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
