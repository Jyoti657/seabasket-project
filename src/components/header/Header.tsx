import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchCart } from "../../store/Slice/cartSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productData } = useSelector((state: RootState) => state.cart);
  const token = useSelector((state: RootState) => state.auth.token);

useEffect(() => {
  if (token) {
    dispatch(fetchCart());
  }
}, [token]);
  const handleLogo = () => {
    navigate("/");
  };
  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [productData]);
  // useEffect(() => {
  //   if (!productData.length) {
  //     dispatch(fetchCart());
  //   }
  // }, [productData]);

  return (
    <header className="bg-seabasket_green text-white sticky top-0 left-0 w-full z-50 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogo}
        >
          <img
            src={logo}
            alt="Seabasket"
            className="w-14 h-14 rounded-2xl object-cover"
          />
          <span className="text-xl sm:text-2xl font-bold text-gray-200">
            SeaBasket
          </span>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <UserDropdown />

          <NavLink
            to="/favorites"
            className="relative flex items-center gap-1 hover:text-red-400 transition"
          >
            <Favorite className="w-6 h-6 text-red-500" />
            <span className="hidden sm:inline text-sm font-medium">
              Favorites
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className="relative flex items-center gap-1 hover:text-teal-300 transition"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
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
