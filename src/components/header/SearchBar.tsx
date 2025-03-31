
import { Search } from "@mui/icons-material";
import { ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/Slice/productSlice";



const SearchBar: React.FC= () => {
  const dispatch=useDispatch();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };
  

  return (
    <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
      <input
        type="text"
        placeholder="Search for products"
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
