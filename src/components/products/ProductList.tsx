import { ProductProps } from "../../types";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/Slice/cartSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../header/FavoriteButton";
import Button from "../ui/Button";
import { currencyFormatter } from "../../util/formatting";

interface ProductsProps {
  productData: ProductProps[];
}

const ProductList: React.FC<ProductsProps> = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products= useSelector((state:RootState)=>state.product.filteredProducts)

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart(product));
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };
  if (!productData || productData.length === 0) {
    return <p className="text-gray-500 text-center"> No products available</p>;
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Products List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl
               transition flex flex-col justify-between h-full"
          >
            <div className="flex-grow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-4 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-500">{product.category}</p>

              <p className="text-gray-600">
                {currencyFormatter.format(product.price)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <Button
                label="Add to Cart"
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={() => handleAddToCart(product)}
              />

              <ShoppingCart
                className="text-xl cursor-pointer"
                onClick={() => handleAddToCart(product)}
              />

              <FavoriteButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
