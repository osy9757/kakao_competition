import React, { useState } from 'react';
import styled from 'styled-components';

const ImagePreviewContainer = styled.div`
    margin: 20px auto;
    width: 100%;
    max-width: 600px;
`;

const StyledImagePreview = styled.img`
    width: 100%;
    height: auto;
`;

interface ImageSelectorProps {
    selectedImage: string; // 선택된 이미지의 URL 혹은 base64 문자열
    onUploadComplete: (resultImageUrl: string) => void; // 이미지 업로드 완료 후 호출될 콜백 함수
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedImage, onUploadComplete }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = async () => {
        setIsLoading(true);
        // TODO: 백엔드 API로 이미지를 업로드하는 코드를 작성해야 합니다.
        // 예시 코드:
        // const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        //     method: "POST",
        //     body: selectedImage
        // });
        // const result = await response.json();
        // onUploadComplete(result.imageUrl);
        setIsLoading(false);
    };

    return (
        <ImagePreviewContainer>
            <StyledImagePreview src={selectedImage} alt="Selected Image" />
            <button onClick={handleImageUpload} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload Image"}
            </button>
        </ImagePreviewContainer>
    );
};

export default ImageSelector;
