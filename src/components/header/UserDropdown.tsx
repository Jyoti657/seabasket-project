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
  const isAuthenticated = useSelector(
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
      className="relative z-50"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition bg-soft_mint "
      >
        <AccountCircle className="w-6 h-6 text-seabasket_green " />
        <div className="flex flex-col items-start text-left">
          <span className="text-sm font-medium text-teal-950 capitalize">
            {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome!"}
          </span>
          <span className="font-semibold  text-sm text-gray-700">Account</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-white text-black shadow-lg rounded-md border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-seabasket_green/10">
            <p className="text-sm font-semibold text-seabasket_green capitalize">
              {user?.firstName ? `Hello, ${user.firstName}` : "Hello, Guest"}
            </p>
          </div>

          <div className="flex flex-col py-2">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/signUp"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/order"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/favorites"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Favorites
                </NavLink>
                <button
                  onClick={handleLogOut}
                  className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
