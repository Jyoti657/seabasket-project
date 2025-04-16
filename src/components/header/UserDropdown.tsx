import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logOut } from "../../store/Slice/authSlice";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenicated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        <AccountCircle className="w-6 h-6 text-blue-600" />
        <p className="font-bold text-white">Account</p>
        <p className="text-sm font-semibold text-gray-700">
          Welcome{user ? `,${user.name}` : ""}!
        </p>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-seabasket_green text-black shadow-lg rounded-md border border-gray-200 z-10">
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              {user ? `welcome ,${user.name}` : `welcome`}
            </p>
          </div>

          <div className="flex flex-col p-2">
            {!isAuthenicated ? (
              <>
                <NavLink
                  to="/signUp"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/order"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/favorites"
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Favorites
                </NavLink>
                <NavLink
                  to="/"
                  onClick={handleLogOut}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  LogOut
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
