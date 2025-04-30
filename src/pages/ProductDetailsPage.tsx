import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { ProductProps } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCartAdd } from "../store/Slice/cartSlice";
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
    dispatch(fetchCartAdd(product));
  };
  const handleProductClick = (id: number) => {
    navigate("/checkout");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchproductsDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!productsDetails)
    return <p className="text-center mt-10">No product found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="bg-soft_mint rounded-lg shadow-lg p-4 sm:p-6 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={productsDetails.imageUrl}
            alt={productsDetails.name}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain border border-gray-300 p-4 rounded-lg shadow"
          />
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {productsDetails.name}
          </h1>

          <p className="text-lg sm:text-xl text-green-600 font-semibold">
            {currencyFormatter.format(productsDetails.price)}
          </p>

          <p className="text-gray-700 text-sm sm:text-base">
            {productsDetails.description}
          </p>

          <p className="text-gray-500 text-sm">
            Category:{" "}
            <span className="capitalize">{productsDetails.category}</span>
          </p>
          {/* 
          <p className="text-gray-500 text-sm">
            Rating: {productsDetails.rating} 
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              label="Buy Now"
              className="w-full sm:w-auto bg-seabasket_green text-white px-6 py-2 rounded-md hover:bg-teal-950 transition"
              onClick={() => handleProductClick(productsDetails.id)}
            />
            <Button
              label="Add to Cart"
              className="w-full sm:w-auto bg-seabasket_green text-white px-6 py-2 rounded-md hover:bg-teal-950 transition"
              onClick={() => handleAddToCart(productsDetails)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
