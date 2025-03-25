import React from "react";
import { LuMenu } from "react-icons/lu";

const HeadBottom: React.FC = () => {
  return (
    <div
      className="bg-gradient-to-t from-seabasket_green text-white p-2 w-full 
        flex items-center gap-2 sm:justify-start 
        md:justify-center md:flex-wrap 
        lg:justify-center lg:gap-4 
        overflow-x-auto whitespace-nowrap mt-4"
    >
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu />
        All
      </p>

      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Amazon miniTV
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Best Seller
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Mobiles
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Cutsomer Service
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Electonics
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        New Realses
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Home & Kitchen{" "}
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        SeaBasket Pay
      </p>
      <p className="h-8 px-3 border border-transparent hover:border-red-600 hover:text-red-500 cursor-pointer duration-300">
        Sign Out
      </p>
    </div>
  );
};

export default HeadBottom;
