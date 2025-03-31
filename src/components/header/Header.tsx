import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const { productData,  } = useSelector(
    (state: RootState) => state.cart
  );
 const {favoriteProducts}=useSelector((state:RootState)=>state.favorites)
  // const dispatch = useDispatch();



  return (
    <header className="bg-seabasket_green p-4 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="text-2xl flex items-center gap-2 font-bold cursor-pointer">
          <img src={logo} alt="Seabasket" className="w-10 h-10" />
          <span className="text-[#EAEAEA]">Seabasket</span>
        </div>

        {/* Search Bar with Function */}
        <SearchBar />

        {/* User, Favorites, and Cart Section (Fixed) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          {/* User Dropdown */}
          <UserDropdown /> 

         <NavLink to={"/favorites"}
         className="relative cursor-pointer flex items-center"
         >
          <Favorite className=" w-6 h-6 text-red-500"/>
          <p className="text-sm font-semibold">Favorite</p>
            {favoriteProducts?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favoriteProducts.length}
              </span>
            )}
         </NavLink>

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
