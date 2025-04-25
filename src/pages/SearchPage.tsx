import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductCards from "../components/products/ProductCard";
import { ProductProps } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchCartAdd } from "../store/Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  const loading = useSelector((state: RootState) => state.product.loading);
  const searchResult =
    useSelector((state: RootState) => state.product.productSearch) || [];
  const error = useSelector((state: RootState) => state.product.error);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(fetchCartAdd(product));
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (error) return <p>{error}</p>;
  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {searchResult && searchResult.length > 0 ? (
        searchResult.map((product: ProductProps) => (
          <ProductCards
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleProductClick={handleProductClick}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-400">
          No products found.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
