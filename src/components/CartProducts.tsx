import { LuMinus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

interface Item {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface cartProductProps {
  item: Item;
}

const CartProducts: React.FC<cartProductProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-md font-bold text-green-600">${item.price}</p>
        <p className="text-md font bold ">{item.description}</p>

        {/* Rating (if available) */}
        {item.rating && (
          <div className="flex items-center mt-1">
            <span className="text-yellow-500 text-sm font-medium">
              {item.rating.rate} ★
            </span>
            <span className="text-gray-500 text-xs ml-2">
              ({item.rating.count} reviews)
            </span>
          </div>
        )}
        <span>
          <LuMinus />
        </span>
        <div>
          <IoMdClose />
          <p>Remove</p>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
