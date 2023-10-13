import "../styles/pages/Home.css";

import React, { Fragment } from "react";
import FindPlace from "../components/pages/home/FindPlace";
import OurService from "../components/pages/home/OurService";
import PopularDestination from "../components/pages/home/PopularDestination";
import Subscribe from "../components/pages/home/Subscribe";

const Home: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  return (
    <div style={{ backgroundColor: "white" }}>
      <FindPlace />
      <OurService />
      <PopularDestination />
      <Subscribe />
    </div>
  );
};

export default Home;
