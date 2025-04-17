import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { ProductProps } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../store/Slice/cartSlice";
import { currencyFormatter } from "../util/formatting";
import Button from "../components/ui/Button";
import { useEffect } from "react";
import { fetchproductsDetails } from "../store/Slice/productSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const productsDetails = useSelector(
    (state: RootState) => state.product.productsDetails
  );
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleAddToCart = (product: ProductProps) => {
    dispatch(addToCart(product));
  };
  const handleProductClick = (id: string) => {
    navigate("/checkout/cart");
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchproductsDetails(id));
    }
  }, [dispatch, id]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!ProductDetails) return <p>No product found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={productsDetails.image}
            alt={productsDetails.title}
            className="w-80 h-80 object-contain border border-gray-300 p-4 rounded-lg shadow"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {productsDetails.title}
          </h1>
          <p className="text-lg text-green-600 font-semibold mt-2">
            {currencyFormatter.format(productsDetails.price)}
          </p>

          <p className="text-gray-700 mt-4">{productsDetails.description}</p>

          <p className="text-gray-500 text-sm mt-2">
            Category: {productsDetails.category}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Rate: {productsDetails.rating?.rate} (
            {productsDetails.rating?.count} reviews)
          </p>

          <div className="mt-6 flex gap-4">
            <Button
              label="Buy Now"
              className="bg-seabasket_green text-white px-6 py-2 rounded-md hover:bg-teal-950 transition"
              onClick={() => handleProductClick(productsDetails.id)}
            />

            <Button
              label="Add to Cart"
              className="bg-seabasket_green text-white px-6 py-2 rounded-md hover:bg-teal-950 transition"
              onClick={() => handleAddToCart(productsDetails)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
