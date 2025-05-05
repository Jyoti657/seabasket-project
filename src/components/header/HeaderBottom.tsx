import { NavLink } from "react-router-dom";

const HeadBottom: React.FC = () => {
  const navItem = [
    { name: "Products", to: "/products" },
    { name: "Mobiles" },
    { name: "Fashion" },
    { name: "Electronics" },
    { name: "Home & Furturies" },
    { name: "Appliance" },
    { name: "Beauty" },
    { name: "Toys" },
    { name: "Two Wheelers" },
    { name: "SeaBasket Pay" },
  ];
  return (
    <div className="bg-deep_teal text-soft_mint w-full px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 justify-start sm:justify-start md:justify-center flex-nowrap">
        {navItem.map((item, index) =>
          item.to ? (
            <NavLink
              key={index}
              to={item.to}
              className="h-8 px-3 flex items-center border border-transparent hover:border-white rounded-md transition duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              {item.name}
            </NavLink>
          ) : (
            <button
              key={index}
              className="h-8 px-3 flex items-center border border-transparent hover:border-white rounded-md transition duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              {item.name}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default HeadBottom;