
import { ProductProps } from "../../types";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/Slice/cartSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../header/FavoriteButton";

interface ProductsProps {
  productData: ProductProps[];
}

const ProductList: React.FC<ProductsProps> = ({ productData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart(product));
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Products List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData?.length > 0 ? (
          productData.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between h-full"
            >
              <div className="flex-grow">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4 cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-gray-500">{product.category}</p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <button
                  className="flex items-center gap-2 bg-seabasket_green text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="text-xl" /> Add to Cart
                </button>

                <FavoriteButton product={product} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
