import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { productCategoriesList } from "../../store/Slice/productSlice";

const CategoriesListProduct: React.FC = () => {
  const CategoryList = useSelector(
    (state: RootState) => state.product.productCategoriesList || []
  );
  const error = useSelector((state: RootState) => state.product.error);
  const loading = useSelector((state: RootState) => state.product.loading);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(productCategoriesList());
  }, [dispatch]);
  console.log("catelogories list prroepr", CategoryList);
  if (error) return <p>{error}</p>;
  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex items-center gap-2">
        {CategoryList && CategoryList.length > 0 ? (
          CategoryList.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No categories found.</p>
        )}

        <div></div>
      </div>
    </div>
  );
};
export default CategoriesListProduct;
