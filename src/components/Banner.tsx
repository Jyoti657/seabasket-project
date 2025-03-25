import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sliderimg1 from "../components/images/slider/slider1.png";
// import sliderimg2 from "../components/images/slider/slider2.jpg";
// import sliderimg3 from "../components/images/slider/silder3.jpg";
// import sliderimg4 from "../components/images/slider/slider4.jpg";
// import sliderimg5 from "../components/images/slider/slider5.jpg";
// import sliderimg6 from "../components/images/slider/slider6.jpg";

const Banner: React.FC = () => {
  return (
    <div className="relative mt-4">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        interval={3000}
      >
        <div>
          <img
            src={sliderimg1}
            alt="Slide 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={sliderimg1}
            alt="Slide 2"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={sliderimg1}
            alt="Slide 3"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={sliderimg1}
            alt="Slide 4"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={sliderimg1}
            alt="Slide 5"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <img
            src={sliderimg1}
            alt="Slide 6"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Carousel>
      <div className=" w-full h-40 bg-gradient-to-t from-seabasket_green"></div>
    </div>
  );
};

export default Banner;
