import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../../styles/pages/Home.css";

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img src="/img1.jpg" alt="" className="siteimg" />
          </div>
          <div>
            <img src="/img2.jpg" alt="" className="siteimg" />
          </div>
          <div>
            <img src="/img3.jpg" alt="" className="siteimg" />
          </div>
          <div>
            <img src="/img4.jpg" alt="" className="siteimg" />
          </div>
          <div>
            <img src="/img5.jpg" alt="" className="siteimg" />
          </div>
          <div>
            <img src="/img6.jpg" alt="" className="siteimg" />
          </div>
        </Slider>
      </div>
    );
  }
}
