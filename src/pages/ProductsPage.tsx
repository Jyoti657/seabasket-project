// import { fetchProducts, filterProducts } from "../store/Slice/productSlice";
// import ProductList from "../components/products/ProductList";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store/store";
// import SortProducts from "../components/products/SortProducts";
// import FilterProducts from "../components/products/FilterProducts";

// const Product: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { allProducts, loading, error } = useSelector(
//     (state: RootState) => state.product
//   );
//   const productsShow=filterProducts.length>0?filterProducts:allProducts

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <>
//       <div className="min-h-screen flex flex-col items-center bg-gray-50">
//         <div className="w-full max-w-7xl px-4 py-10">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//             Featured Products
//           </h1>
//           <SortProducts />
//           <FilterProducts/> 

//           {loading && <p className="text-center text-blue-500">Loading...</p>}
//           {error && <p className="text-center text-red-500">{error}</p>}
//           {!loading && !error && allProducts?.length > 0 ? (
//             <ProductList productData={allProducts} />
//           ) : (
//             !loading &&
//             !error && (
//               <p className="text-gray-500 text-center">No products available</p>
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Product;
import { fetchProducts } from "../store/Slice/productSlice";
import ProductList from "../components/products/ProductList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
// import SortProducts from "../components/products/SortProducts";
import FilterProducts from "../components/products/FilterProducts";

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allProducts, filteredProducts, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const productsShow = filteredProducts.length > 0 ? filteredProducts : allProducts;

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(fetchProducts)
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Products
        </h1>
         {/* <SortProducts />  */}
        {/* <FilterProducts /> */}

        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && productsShow?.length > 0 ? (
          <ProductList productData={productsShow} />
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
