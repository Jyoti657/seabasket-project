import { Search, ShoppingCart } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { stateProps } from "../../types";
import { MdFavorite } from "react-icons/md";

const Header: React.FC = () => {
  const { productData, favoritData, userInfo } = useSelector(
    (state: stateProps) => state.slice
  );

  const dispatch = useDispatch();

  return (
    <header className="bg-seabasket_green p-4 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl flex items-center gap-2 font-bold cursor-pointer">
          <img src={logo} alt="Seabasket" className="w-10 h-10" />
          <span className="text-black">Seabasket</span>
        </div>

        <div className="flex w-full md:w-[50%] bg-white rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for products"
            className="flex-grow px-4 py-2 text-black outline-none"
          />
          <button className="bg-seabasket_green px-4">
            <Search className="text-black w-5 h-5 bg-yellow-300" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
          <div className="cursor-pointer text-left hover:text-gray-200">
            <p>Hello, sign up</p>
            <p className="font-bold">Account & Lists</p>
          </div>
          <div className="cursor-pointer text-left hover:text-gray-200">
            <p>Returns</p>
            <p className="font-bold">& Orders</p>
          </div>
          <div className="relative flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
            <MdFavorite className="w-6 h-6 text-red-500" />
            <p className="text-sm font-semibold">Favorite</p>
            {favoritData.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favoritData.length}
              </span>
            )}
          </div>
          <NavLink
            to={"/cart"}
            className="relative cursor-pointer flex items-center"
          >
            <ShoppingCart className="w-6 h-6" />
            <p className="text-xs text-white font-bold mt-3">Cart</p>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {productData ? productData.length : 0}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
