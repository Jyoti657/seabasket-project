import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { productCategories } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const rawCategories = useSelector(
    (state: RootState) => state.product.productCategories
  ) as { name: string; imageUrl: string }[];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(productCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-5">
      <h2 className="font-semibold mb-5 text-3xl text-center bg-charcoal text-soft_mint">
        Categories
      </h2>
      <div className="">
        <ul className="flex flex-wrap justify-center gap-4">
          {rawCategories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="p-3 border hover:bg-seabasket_green hover:text-white cursor-pointer text-center transition rounded-l bg-soft_mint shadow-md"
            >
              {typeof category.name === "string" ? (
                <span>{category.name}</span>
              ) : (
                <span>Invalid category name</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
