import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { productCategories } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  images?: string;
}
const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const rawCategories = useSelector(
    (state: RootState) => state.product.productCategories
  );
  const categories: Category[] = rawCategories.filter(
    (category) => typeof category === "object" && "name" in category
  ) as Category[];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(productCategories());
  }, [dispatch]);

  if (!categories || categories.length === 0) {
    return <p className="text-gray-700 text-center">No Categories Found</p>;
  }
  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-5">
      <h2 className="font-semibold mb-5 text-3xl text-center bg-charcoal text-soft_mint"> Categories</h2>
      
      <ul className="flex flex-wrap gap-4 justify-center">
        {categories.map((category, index) => (
          <li
            onClick={() => handleCategoryClick(category.name)}
            key={index}
            className="p-3 border  hover:bg-seabasket_green hover:text-white cursor-pointer text-center transition rounded-l bg-soft_mint shadow-md"
          >
            {category.name}
            {/* {category.images && (  */}
             {/* <img
              src={category.images||" "}
              className="w-16 h-16 object-cover mx-auto mt-2 rounded-full border-2 border-seabasket_green"
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoryList;
