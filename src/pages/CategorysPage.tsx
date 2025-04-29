import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getproductCategoriesList } from "../store/Slice/productSlice";
import { fetchCartAdd } from "../store/Slice/cartSlice";
import Button from "../components/ui/Button";
const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const navigae = useNavigate();
  const getcategory = useSelector(
    (state: RootState) => state.product.getProductCategoriesList
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (categoryName) {
      dispatch(getproductCategoriesList(categoryName));
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
  const handleAddToCart = (product: any) => {
    dispatch(fetchCartAdd(product));
  };
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-seabasket_green mb-8 capitalize">
        {categoryName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getcategory.map((product, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col p-4"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-40 object-contain rounded-lg mb-4 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            />
            <p className="text-sm text-gray-600 mb-1">₹{product.price}</p>
            <p className="text-gray-800 font-bold text-sm mb-2 truncate">
              {product.name}
            </p>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                label="Add to Cart"
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-seabasket_green hover:bg-seabasket_green-dark text-white py-2 px-4 rounded transition w-full hover:bg-teal-950"
              />
              <Button
                label="Buy Now"
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-seabasket_green hover:bg-seabasket_green-dark text-white py-2 px-4 rounded transition w-full hover:bg-teal-950"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
