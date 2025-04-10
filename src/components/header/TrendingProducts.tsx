import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const TrendingProducts: React.FC = () => {
  const navigate = useNavigate();
  const trendingProducts = useSelector(
    (state: RootState) => state.product.allProducts
  );
  const handleTrendingProducts = (id: number) => {
    navigate(`products/${id}`);
  };
  return (
    <>
      <div className="relative mt-4 w-full max-w-screen-3xl mx-auto">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          interval={2000}
        >
          {trendingProducts.map((products, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-[420px] md:h-[500px] px-4"
            >
              <div
                className="flex bg-white rounded-2xl shadow-lg p-6 max-w-3xl flex-col md:flex-row items-center gap-6 cursor-pointer"
                onClick={() => handleTrendingProducts(products.id)}
              >
                <img
                  src={products.image}
                  alt={products.title || `Slide ${index + 1}`}
                  className="w-full md:w-1/2 h-64 object-contain rounded-xl"
                />

                <div className="text-center md:text-left">
                  <h2 className="text-xl font-semibold mb-2">
                    {products.title}
                  </h2>
                  <p className="text-gray-600 mb-2 line-clamp-3">
                    {products.description}
                  </p>
                  <p className="text-seabasket_green font-bold text-lg">
                    ₹{products.price}
                  </p>{" "}
                  *
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-soft_mint"></div>
      </div>
    </>
  );
};
export default TrendingProducts;
