import "../styles/pages/Home.css";

import React, { Fragment } from "react";
import FindPlace from "../components/pages/home/FindPlace";
import OurService from "../components/pages/home/OurService";
import PopularDestination from "../components/pages/home/PopularDestination";
import Subscribe from "../components/pages/home/Subscribe";

// import BackgroundChanger from '../components/common/BackgroundChanger';

const Home: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  return (
    // <BackgroundChanger imageList={images} />;
    <Fragment>
      <FindPlace />
      <OurService />
      <PopularDestination />
      <Subscribe />
    </Fragment>
  );
};

export default Home;
