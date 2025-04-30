import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { productCategories } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const HeadBottom: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const categories = useSelector(
    (state: RootState) => state.product.productCategories
  ) as { name: string; imageUrl: string }[];

  useEffect(() => {
    dispatch(productCategories());
  }, [dispatch]);

  return (
    <div className="bg-deep_teal text-soft_mint w-full px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-start sm:justify-start md:justify-center flex-nowrap">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => navigate(`/category/${category.name}`)}
            className="h-8 px-3 flex items-center border border-transparent hover:border-white rounded-md transition duration-300 text-sm sm:text-base whitespace-nowrap"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeadBottom;
