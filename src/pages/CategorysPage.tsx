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
  const navigate = useNavigate(); // ✅ fixed typo
  const dispatch = useDispatch<AppDispatch>();

  const filteredProducts = useSelector(
    (state: RootState) => state.product.allProducts
  );

  useEffect(() => {
    if (categoryName) {
      dispatch(productFilter({ category: categoryName }));
    }
  }, [dispatch, categoryName]);

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product: ProductProps) => {
    dispatch(addCart(product.id));
  };

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 px-4">
        <p className="text-center text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-16 py-10">
      <h2 className="text-3xl font-extrabold text-center text-seabasket_green capitalize mb-10">
        {categoryName}
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCards
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            onFavoriteSuccess={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
