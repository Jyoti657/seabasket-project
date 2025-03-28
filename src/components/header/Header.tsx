import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const { productData, favoritData } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();

  // Function to handle search
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Dispatch a Redux action or make API call if needed
  };

  return (
    <header className="bg-seabasket_green p-4 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="text-2xl flex items-center gap-2 font-bold cursor-pointer">
          <img src={logo} alt="Seabasket" className="w-10 h-10" />
          <span className="text-black">Seabasket</span>
        </div>

        {/* Search Bar with Function */}
        <SearchBar onSearch={handleSearch} />

        {/* User, Favorites, and Cart Section (Fixed) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          {/* User Dropdown */}
          <UserDropdown /> 

          {/* Favorites */}
          <div className="relative flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
            <Favorite className="w-6 h-6 text-red-500" />
            <p className="text-sm font-semibold">Favorite</p>
            {favoritData?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favoritData.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <NavLink
            to={"/cart"}
            className="relative cursor-pointer flex items-center"
          >
            <ShoppingCart className="w-6 h-6" />
            <p className="text-xs text-white font-bold mt-3">Cart</p>
            {productData?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {productData.length}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
