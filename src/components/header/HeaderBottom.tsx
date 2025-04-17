import { NavLink } from "react-router-dom";

const HeadBottom: React.FC = () => {
  return (
    <div
      className="bg-deep_teal text-soft_mint p-2  left-0  top-16 w-full 
        flex items-center gap-2 sm:justify-start 
        md:justify-center md:flex-wrap 
        lg:justify-center lg:gap-4 
        overflow-x-auto whitespace-nowrap "
    >
      <NavLink
        to="/products"
        className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300"
      >
        Products
      </NavLink>

      <p className="flex items-center gap-1 h-8 px-3 border  border-transparent hover:border-white cursor-pointer duration-300">
        Mobiles
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Fashion
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Electronics
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Home & Furturies
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Appliance
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Beauty
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Toys
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        Two Wheelers
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border   border-transparent hover:border-white cursor-pointer duration-300">
        SeaBasket Pay
      </p>
    </div>
  );
};

export default HeadBottom;
