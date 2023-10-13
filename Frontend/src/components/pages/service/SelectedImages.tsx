import styled from 'styled-components';

const SelectedImageContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const ImageInfoContainer = styled('div')`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px; // 추가 설명과 이미지 사이의 간격
`;

const ImageTitle = styled('h2')`
    text-align: center;
`;

const ImageDescription = styled('p')`
    text-align: center;
`;

const ImageWithDescription = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
        width: 50%;  
        margin-right: 10px;
        border-radius: 10px;  
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
    }
    
    p {
        flex: 1;
        font-size: 16px;  
        color: #333;  
    }
`;

interface SelectedImageProps {
    imageUrl: string;
    description: string;
}

const SelectedImage: React.FC<SelectedImageProps> = ({ imageUrl, description }) => {
    return (
        <SelectedImageContainer>
            <ImageInfoContainer>
                <ImageTitle>Like한 이미지와 유사한 여행지 이미지 결과</ImageTitle>
                <ImageDescription>
                    Far far away, behind the word mountains, far from the countries Vokalla and
                    <br />
                    Consonatia, there live the blind texts. Separated they live in Bookmarkgrove
                    <br />
                    right at the coast of the Semantics, a large language ocean.
                </ImageDescription>
            </ImageInfoContainer>
            <ImageWithDescription>
                <img src={imageUrl} alt="Selected Image" />
                <p>test</p>
            </ImageWithDescription>
        </SelectedImageContainer>
    );
}

export default SelectedImage;
