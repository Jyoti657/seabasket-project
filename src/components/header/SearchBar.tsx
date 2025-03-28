// import { Search} from "@mui/icons-material";
// import { useState } from "react";

// interface SearchBarProps{
//     onSearch:(query:string)=> void;
// }
// const  SearchBar: React.FC<SearchBarProps>=({onSearch})=>{
//     const [searchQuery ,setSearchQuery]=useState("")
//     const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
//         const query=e.target.value;
//         setSearchQuery(query)
//         onSearch(query)

//     }
//      return (
//         <>
//         {/* Search Bar */}
//                 <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
//                   <input
//                     type="text"
//                     placeholder="Search for products"
//                     className="flex-grow px-4 py-2 text-black outline-none"
//                     onChange={handleChange}
//                   />
//                   <button className="bg-yellow-300 px-4">
//                     <Search className="text-black w-5 h-5" />
//                   </button>
//                 </div>
//         </>
//      )
// }
// export default SearchBar
import { Search } from "@mui/icons-material";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Trigger search function in parent component
  };

  return (
    <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
      <input
        type="text"
        placeholder="Search for products"
        value={searchQuery}
        onChange={handleChange}
        className="flex-grow px-4 py-2 text-black outline-none"
      />
      <button className="bg-yellow-300 px-4">
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
