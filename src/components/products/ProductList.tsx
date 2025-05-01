import { ProductProps } from "../../types";
import { useDispatch } from "react-redux";
import { fetchCartAdd } from "../../store/Slice/cartSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ProductCards from "./ProductCard";
import { useState } from "react";

interface ProductsProps {
  productData: ProductProps[];
}

const ProductList: React.FC<ProductsProps> = ({ productData }) => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(fetchCartAdd(product.id));
    setSuccessMsg("Item added to cart!");
    clearMessage();
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

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (!productData || productData.length === 0) {
    return <p className="text-gray-500 text-center">No products available</p>;
  }

  return (
    <>
      {successMsg && (
        <div className="text-center text-green-600 font-medium mb-4">
          {successMsg}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productData.map((product) => (
          <ProductCards
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleProductClick={handleProductClick}
            onFavoriteSuccess={handleFavoriteSuccess}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
