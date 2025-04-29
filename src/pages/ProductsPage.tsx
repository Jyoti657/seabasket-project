import { fetchProducts } from "../store/Slice/productSlice";
import ProductList from "../components/products/ProductList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import FilterProducts from "../components/products/FilterProducts";
import SortProducts from "../components/products/SortProducts";

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="h-full bg-gray-50 grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
      <div className="lg:block p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
        <FilterProducts />
        
      </div>

      <div className="col-span-3">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Products
        </h1>
        <SortProducts/>

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && allProducts.length > 0 ? (
          <ProductList productData={allProducts} />
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 text-center">No products available</p>
          )
        )}
      </div>
    </div>
  );
};

export default Product;
