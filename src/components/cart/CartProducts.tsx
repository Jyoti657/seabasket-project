// 
import { useState } from "react";
import { LuMinus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { currencyFormatter } from "../../util/formatting"; // Import formatter
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/Slice/cartSlice";

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

interface CartProductProps {
  item: Item;
}

const CartProducts: React.FC<CartProductProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1); // Initialize quantity
  
   const dispatch=  useDispatch()

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleRemove =()=>{
    dispatch(deleteProduct(item.id))

  }

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
        <p className="text-md font-bold text-green-600">
          {currencyFormatter.format(item.price * quantity)}
        </p>
        <p className="text-sm text-gray-600">{item.description}</p>

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

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            className="p-1 border rounded-md hover:bg-gray-100"
          >
            <LuMinus />
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-1 border rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button className="flex items-center gap-1 mt-3 text-red-500 hover:text-red-700" 
        onClick={handleRemove}
        >
          <IoMdClose />
          <span>Remove</span>
        </button>
      </div>
      
    </div>
  );
};

export default CartProducts;
