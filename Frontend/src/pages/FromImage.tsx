import React, { useState, useEffect, useRef } from "react";
import ImageDisplay from "../components/pages/service/ImageDisplay";
import ResultImages from "../components/pages/service/ResultImages";
import styled from "styled-components";
import axios from "axios";
import Loading from "../components/common/Loading";

const PageContainer = styled("div")`
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [resultImages, setResultImages] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_URL = "http://43.202.138.58:8000/kyh/";

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response = await axios.get(`${API_URL}send_random/`);
        if (response.status === 200) {
          console.log("Received random images:", response.data);
          setImageList(response.data);
          setMainImage(response.data[0]);
        }
      } catch (error) {
        console.error(`Error fetching random images: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomImages();
  }, []);

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
          overview: overview,
        });
      }
    }
    return results;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % 6;
        setMainImage(imageList[newIndex]);
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [imageList]);

  const handleLike = () => {
    callAPI(mainImage!);
  };

  const callAPI = async (imgPath: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(imgPath);
      const imageBlob = await response.blob();

      const formData = new FormData();
      formData.append("files", imageBlob, imgPath);

      const apiResponse = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (apiResponse.status === 200) {
        const transformedResults = transformAPIResponse(apiResponse.data);
        setResultImages(transformedResults);
      } else {
        console.error(
          `Error occurred: ${apiResponse.status} - ${apiResponse.data}`
        );
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
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMainImage(fileURL);
      callAPI(fileURL);
    }
  };

  const handleSkip = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 6);
    setMainImage(imageList[(currentImageIndex + 1) % 6]);
  };

  return (
    <PageContainer>
      <ImageDisplay
        imageUrl={mainImage || ""}
        onLike={handleLike}
        onCamera={handleCamera}
        onSkip={handleSkip}
        disabled={isLoading}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg, .png"
        style={{ display: "none" }}
        onChange={handleFileSelected}
      />
      {isLoading ? <Loading /> : ""}
      {resultImages.length > 0 && <ResultImages results={resultImages} />}
    </PageContainer>
  );
};

export default MainPage;
