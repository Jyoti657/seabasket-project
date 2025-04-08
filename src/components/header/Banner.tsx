
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sliderimg1 from "../images/slider/slider1.png";
import sliderimg2 from "../images/slider/slider2.png";
import sliderimg3 from "../images/slider/slider3.png";
import sliderimg4 from "../images/slider/slider4.png";

const Banner: React.FC = () => {
  return (
    <div className="relative mt-4 w-full max-w-screen-xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showIndicators={false}
        interval={3000}
      >
        {[sliderimg1, sliderimg2, sliderimg3, sliderimg4].map((img, index) => (
          <div key={index} className="w-full h-[400px] md:h-[500px]">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-seabasket_green"></div>
    </div>
  );
};

export default Banner;
