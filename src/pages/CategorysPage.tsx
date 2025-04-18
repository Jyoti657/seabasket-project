import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getproductCategoriesList } from "../store/Slice/productSlice";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
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
    return <p className="text-gray-700 text-center">No Categories Found</p>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
        {categoryName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-8">
        {getcategory && getcategory.length > 0 ? (
          getcategory.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition flex
                flex-col justify-betwee n h-full
                "
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.brand}</h3>
              <p className="text-gray-600">{product.price}</p>
              <p className="text-gray-800 font-bold mt-2">{product.title}</p>
              <p className="text-gray-500">{product.description}</p>
              <div className="mt-auto">
                <button className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-seabasket_green-dark transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};
export default CategoryPage;
