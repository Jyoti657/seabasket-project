import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const { productData } = useSelector((state: RootState) => state.cart);

  return (
    <header className="bg-seabasket_green p-4 text-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl flex items-center gap-2 font-bold cursor-pointer">
          <img src={logo} alt="Seabasket" className="w-10 h-10" />
          <span className="text-gray-300">Seabasket</span>
        </div>

        <SearchBar />

        <div className="flex items-center gap-6">
          <UserDropdown />

          <NavLink
            to="/favorites"
            className="relative flex items-center gap-1 text-white hover:text-red-400 transition"
          >
            <Favorite className="w-6 h-6 text-red-500" />
            <p className="text-sm font-semibold">Favorites</p>
          </NavLink>

          <NavLink
            to="/checkout/cart"
            className="relative flex items-center gap-1 text-white hover:text-yellow-400 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            <p className="text-sm font-semibold">Cart</p>
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
