import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { productData } = useSelector((state: RootState) => state.cart);

  
  const handleLogo = () => {
    navigate("/");
  };

  return (
    <header className="bg-seabasket_green text-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3">
        <div
          className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer w-full sm:w-auto"
          onClick={handleLogo}
        >
          <img
            src={logo}
            alt="Seabasket"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover"
          />
          <span className="text-lg sm:text-2xl font-bold text-gray-200">
            SeaBasket
          </span>
        </div>

        <div className="w-full sm:w-1/2 order-3 sm:order-none">
          <SearchBar />
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto">
          <UserDropdown />

          <NavLink
            to="/favorites"
            className="relative flex items-center gap-1 hover:text-red-400 transition"
          >
            <Favorite className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            <span className="hidden xs:inline text-sm font-medium">
              Favorites
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className="relative flex items-center gap-1 hover:text-teal-300 transition"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="hidden xs:inline text-sm font-medium">Cart</span>
            {productData?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-teal-950 font-semibold text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
