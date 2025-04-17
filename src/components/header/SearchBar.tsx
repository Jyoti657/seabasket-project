import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import { productSearch, setSearchQuery } from "../../store/Slice/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const navigate= useNavigate()
  const dispatch=  useDispatch<AppDispatch>();
  const query=useSelector((state:RootState)=>state.product.searchQuery||"")
  const[input,setInput]=useState(query)
  const handleSearch=()=>{
    dispatch(setSearchQuery(input))
    dispatch(productSearch(input))
    navigate("/search")

  }
  const  handleInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  return (
    <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Search for products"
        className="flex-grow px-4 py-2 text-black outline-none"
        onKeyDown={handleKeyDown}
      />
      <button className="bg-teal-500 hover:bg-teal-800 px-4" onClick={handleSearch}>
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
