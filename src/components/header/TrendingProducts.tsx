import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect } from "react";
import { trendingProducts } from "../../store/Slice/productSlice";

const TrendingProducts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  useEffect(() => {
    dispatch(trendingProducts());
  }, [dispatch]);

  const handleTrendingProducts = (id: number) => {
    navigate(`products/${id}`);
  };
  if (loading) return <p> Loading the trending products</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="relative mt-4 w-full max-w-screen-2xl mx-auto bg-deep_teal">
      <h2 className="text-2xl font-bold text-white mb-4 border-l-4 pl-3 text-center border-teal-700 m-8">
        Trending Products
      </h2>

      {allProducts && allProducts.length > 0 ? (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={false}
          interval={2000}
        >
          {allProducts.map((products, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-[420px] md:h-[500px] px-4"
            >
              <div
                className="flex bg-soft_mint rounded-2xl shadow-lg p-6 max-w-3xl flex-col md:flex-row items-center gap-6 cursor-pointer"
                onClick={() => handleTrendingProducts(products.id)}
                role="button"
              >
                <img
                  src={products.imageUrl}
                  alt={products.name || `Slide ${index + 1}`}
                  loading="lazy"
                  className="w-full md:w-1/2 h-64 object-contain rounded-xl"
                />

                <div className="text-center md:text-left">
                  <h2 className="text-xl font-semibold mb-2">
                    {products.name}
                  </h2>
                  <p className="text-gray-600 mb-2 line-clamp-3">
                    {products.description}
                  </p>
                  <p className="text-seabasket_green font-bold text-lg">
                    ₹{products.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No trending products available.
        </p>
      )}
    </div>
  );
};

export default TrendingProducts;
