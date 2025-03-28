import { fetchProducts } from "../store/Slice/cartSlice";
import ProductList from "../components/products/ProductList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selecting state from Redux store
  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Fetched products:", allProducts);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 py-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Featured Products
          </h1>
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && allProducts.length > 0 && (
            <ProductList productData={allProducts} />
          )}
        </div>
      </div>
    </>
  );
};
export default Product;
