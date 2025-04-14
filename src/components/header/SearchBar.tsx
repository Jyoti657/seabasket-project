import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setSearchQuery } from "../../store/Slice/productSlice";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.product.searchQuery as string);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={handleSearch}
        className="flex-grow px-4 py-2 text-black outline-none"
      />
      <button className="bg-yellow-300 px-4">
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
