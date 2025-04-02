// import React from "react";


// const HeadBottom: React.FC = () => {
//   // logic change this should be come from authn slice
//   // const { userInfo } = useSelector((state: RootState) => state.cart);
//   return (
//     <div
//       className="bg-gradient-to-t from-seabasket_green text-white p-2 w-full 
//         flex items-center gap-2 sm:justify-start 
//         md:justify-center md:flex-wrap 
//         lg:justify-center lg:gap-4 
//         overflow-x-auto whitespace-nowrap mt-4"
//     >
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        
//         Kilos
//       </p>

//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Mobiles
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Fashion
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Electronics
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Home & Furturies
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Appliance
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Beauty
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         Toys
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//       Two Wheelers
//       </p>
//       <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
//         SeaBasket Pay
//       </p>
//       {/* {userInfo && <button>SignOut</button>} */}
//       {/* <p className="h-8 px-3 border border-transparent hover:border-red-600 hover:text-red-500 cursor-pointer duration-300">
//         Sign Out
//       </p> */}
//     </div>
//   );
// };

// export default HeadBottom;
import React from "react";

const HeadBottom: React.FC = () => {
  // logic change this should be come from authn slice
  // const { userInfo } = useSelector((state: RootState) => state.cart);
  return (
    <div
      className="bg-gradient-to-t from-seabasket_green text-white p-2  left-0  top-16 w-full 
        flex items-center gap-2 sm:justify-start 
        md:justify-center md:flex-wrap 
        lg:justify-center lg:gap-4 
        overflow-x-auto whitespace-nowrap mt-4"
    >
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Kilos
      </p>

      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Mobiles
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Fashion
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Electronics
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Home & Furturies
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Appliance
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Beauty
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Toys
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        Two Wheelers
      </p>
      <p className="flex items-center gap-1 h-8 px-3 border border-transparent hover:border-white cursor-pointer duration-300">
        SeaBasket Pay
      </p>
      {/* {userInfo && <button>SignOut</button>} */}
      {/* <p className="h-8 px-3 border border-transparent hover:border-red-600 hover:text-red-500 cursor-pointer duration-300">
        Sign Out
      </p> */}
    </div>
  );
};

export default HeadBottom;
