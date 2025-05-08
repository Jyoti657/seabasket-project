import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { addCart } from "../store/Slice/cartSlice";
import { productFilter } from "../store/Slice/productSlice";
import { useEffect } from "react";
import { ProductProps } from "../types";
import ProductCards from "../components/products/ProductCard";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const navigae = useNavigate();
  const getcategory = useSelector(
    (state: RootState) => state.product.allProducts
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (categoryName) {
      dispatch(productFilter({ category: categoryName }));
    }
  }, [dispatch, categoryName]);

  if (!getcategory || getcategory.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-center px-4">
        <p>No products found in this category.</p>
      </div>
    );
  }
  const handleProductClick = (id: number) => {
    navigae(`/products/${id}`);
  };

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addCart(product.id));
  };
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-seabasket_green mb-8 capitalize">
        {categoryName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getcategory.map((product, index) => (
          <ProductCards
            key={index}
            product={product}
            handleAddToCart={handleAddToCart}
            handleProductClick={handleProductClick}
            onFavoriteSuccess={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
