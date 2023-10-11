import React, { useState } from 'react';
import HeaderImage from '../components/pages/service/HeaderImage';
import ImageSelector from '../components/pages/service/ImageSelector';
import ResultImage from '../components/pages/service/ResultImage';

const FromImage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
    const [hoverImageUrl, setHoverImageUrl] = useState<string | null>(null); // 예시로 추가한 상태, 실제로는 백엔드 API의 응답에 따라 설정할 수 있습니다.

    const handleLike = () => {
        setSelectedImage("/path/to/liked/image.jpg"); // 예시 경로, 실제 이미지 경로로 변경해야 합니다.
    };

    const handleCamera = () => {
        // 파일 선택 및 업로드 로직을 추가해야 합니다.
    };

    const handleSkip = () => {
        setSelectedImage(null);
        // 다음 이미지로 넘어가는 로직을 추가해야 합니다.
    };

    const handleUploadComplete = (uploadedImageUrl: string) => {
        setResultImageUrl(uploadedImageUrl);
        setHoverImageUrl("/path/to/hover/image.jpg"); // 예시 경로, 실제 이미지 경로로 변경해야 합니다.
    };

    return (
        <div>
            <HeaderImage onLike={handleLike} onCamera={handleCamera} onSkip={handleSkip} />
            {selectedImage && <ImageSelector selectedImage={selectedImage} onUploadComplete={handleUploadComplete} />}
            {resultImageUrl && hoverImageUrl && <ResultImage imageUrl={resultImageUrl} hoverImageUrl={hoverImageUrl} />}
        </div>
    );
};

export default FromImage;
