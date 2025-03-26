import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Banner from "../components/Banner";
import Products from "../components/Products";
import { fetchProducts } from "../store/slice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.slice
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Banner />
      <div className="w-full max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Products
        </h1>
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Products productData={allProducts} />
      </div>
    </div>
  );
};

export default Home;
