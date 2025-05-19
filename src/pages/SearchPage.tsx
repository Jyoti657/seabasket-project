import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductCards from "../components/products/ProductCard";
import { ProductProps } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addCart } from "../store/Slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchPage: React.FC = () => {
  const [successMsg, setSuccessMsg] = useState("");

  const loading = useSelector((state: RootState) => state.product.loading);
  const searchResult =
    useSelector((state: RootState) => state.product.productSearch) || [];
  const error = useSelector((state: RootState) => state.product.error);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addCart(product.id));
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleFavoriteSuccess = () => {
    setSuccessMsg("Item added to favorites!");
    clearMessage();
  };
  const clearMessage = () => {
    setTimeout(() => {
      setSuccessMsg("");
    }, 1000);
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
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            onFavoriteSuccess={handleFavoriteSuccess}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-400">
          No products found.
        </p>
      )}
      {successMsg && (
        <div className="text-center text-green-600 font-medium mb-4">
          {successMsg}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
