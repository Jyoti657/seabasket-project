import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { productCategories } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const rawCategories = useSelector(
    (state: RootState) => state.product.productCategories
  ) as { name: string; imageUrl: string }[];

  useEffect(() => {
    dispatch(productCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-5 bg-soft_mint m-10">
      <h2 className="font-semibold mb-5 text-3xl text-center bg-charcoal text-soft_mint py-2 rounded-md">
        Shop By the Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
        {rawCategories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="p-4 rounded-lg shadow-md bg-white hover:bg-seabasket_green hover:text-white transition cursor-pointer text-center"
          >
            <p className="mt-3 font-medium text-lg">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
