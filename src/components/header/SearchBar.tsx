import { Search } from "@mui/icons-material";

const SearchBar: React.FC = () => {
  return (
    <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
      <input
        type="text"
        placeholder="Search for products"
        className="flex-grow px-4 py-2 text-black outline-none"
      />
      <button className="bg-yellow-300 px-4">
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
