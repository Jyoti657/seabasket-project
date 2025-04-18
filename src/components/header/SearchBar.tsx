import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import { productSearch, setSearchQuery } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector(
    (state: RootState) => state.product.searchQuery || ""
  );
  const [input, setInput] = useState(query);
  const handleSearch = () => {
    dispatch(setSearchQuery(input));
    dispatch(productSearch(input));
    navigate("/search");
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full md:w-[50%] flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
      <input
        type="text"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Search for products"
        className="w-full px-4 py-2 text-sm sm:text-base text-black outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-teal-500 hover:bg-teal-700 transition-colors duration-300 px-4 py-2 flex items-center justify-center"
      >
        <Search className="text-white w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
