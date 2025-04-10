import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        <AccountCircle className="w-6 h-6 text-blue-600" />
        <p className="font-bold text-white">Account</p>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-seabasket_green text-black shadow-lg rounded-md border border-gray-200 z-10">
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-700">Welcome!</p>
          </div>

          <div className="flex flex-col p-2">
            <NavLink
              to="/login"
              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Login
            </NavLink>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
