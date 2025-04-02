
import { useState } from "react";
import { LuMinus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { currencyFormatter } from "../../util/formatting";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../store/Slice/cartSlice";
import { ProductProps } from "../../types";


interface CartProductProps {
  item: ProductProps;
}

const CartProducts: React.FC<CartProductProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleRemove = () => {
    dispatch(deleteProduct(String(item.id)));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 bg-white shadow-md rounded-lg border border-gray-200 w-full">
      {/* Product Image */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 space-y-2 text-center sm:text-left">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {item.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
        <p className="text-sm sm:text-lg font-bold text-green-600">
          {currencyFormatter.format(item.price * quantity)}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        {/* Rating (if available) */}
        {item.rating && (
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="text-yellow-500 text-xs sm:text-sm font-medium">
              {item.rating.rate} ★
            </span>
            <span className="text-gray-500 text-xs">
              ({item.rating.count} reviews)
            </span>
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
          <button
            onClick={handleDecrease}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            <LuMinus />
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button
          className="flex items-center justify-center sm:justify-start gap-1 text-red-500 hover:text-red-700 mt-2"
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
