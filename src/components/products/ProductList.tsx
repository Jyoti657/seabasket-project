import { ProductProps } from "../../types";
import { useDispatch } from "react-redux";
import {  fetchCartAdd } from "../../store/Slice/cartSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ProductCards from "./ProductCard";

interface ProductsProps {
  productData: ProductProps[];
}

const ProductList: React.FC<ProductsProps> = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(fetchCartAdd(product));
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (!productData || productData.length === 0) {
    return <p className="text-gray-500 text-center">No products available</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productData.map((product) => (
        <ProductCards
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          handleProductClick={handleProductClick}
        />
      ))}
    </div>
  );
};

export default ProductList;
