import { LuMinus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { currencyFormatter } from "../../util/formatting";
import { useDispatch } from "react-redux";
import { ProductProps } from "../../types";
import { AppDispatch } from "../../store/store";
import { fetchCart, addCart, removeItem } from "../../store/Slice/cartSlice";

interface CartProductProps {
  item: ProductProps;
}

const CartProducts: React.FC<CartProductProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleIncrease = () => {
    if (item.id) {
      dispatch(addCart(item.id)).then(() => {
        dispatch(fetchCart());
      });
    }
  };
  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 bg-white shadow-md rounded-lg border border-gray-200 w-full">
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      <div className="flex flex-col flex-1 space-y-2 text-center sm:text-left">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {item.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
        <p className="text-sm sm:text-lg font-bold text-green-600">
          {currencyFormatter.format(item.price * item.quantity)}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        {item.rating && (
          <div className="flex items-center justify-center sm:justify-start space-x-2">
            <span className="text-teal-500 text-xs sm:text-sm font-medium">
              {item.rating}
            </span>
          </div>
        )}

        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
          <button className="p-2 border rounded-md hover:bg-soft_mint">
            <LuMinus />
          </button>
          <span className="text-lg font-medium">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          onClick={() => handleRemove(item.id)}
          className="flex items-center justify-center sm:justify-start gap-1 text-red-500 hover:text-red-700 mt-2"
        >
          <IoMdClose />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
