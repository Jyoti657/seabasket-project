import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { ProductProps } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../store/Slice/cartSlice";
import { currencyFormatter } from "../util/formatting";
import Button from "../components/ui/Button";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const allProducts = useSelector(
    (state: RootState) => state.product.allProducts
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart(product));
  };
  const handleProductClick = (id: number ) => {
    navigate('/checkout/cart');
  };

  const productId = Number(id);
  const product: ProductProps | undefined = allProducts?.find(
    (p) => p.id === productId
  );

  if (!product) {
    return (
      <p className="text-red-500 text-center">
        Product not found. Please check the ID or refresh the page.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-80 h-80 object-contain border border-gray-300 p-4 rounded-lg shadow"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-green-600 font-semibold mt-2">
            {currencyFormatter.format(product.price)}
          </p>

          <p className="text-gray-700 mt-4">{product.description}</p>

          <p className="text-gray-500 text-sm mt-2">
            Category: {product.category}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Rate: {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <div className="mt-6 flex gap-4">
            <Button
              label="Buy Now"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
              onClick={() => handleProductClick(product.id)}
            />

            <Button
              label="Add to Cart"
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
              onClick={() => handleAddToCart(product)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
