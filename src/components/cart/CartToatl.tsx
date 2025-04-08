import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/Slice/cartSlice";
import { currencyFormatter } from "../../util/formatting";

const CartTotal: React.FC = () => {
  const totalPrice = useSelector(selectCartTotal);

  return (
    <div className=" w-full justify-between items-center bg-gray-50 p-4  shadow-md border border-gray-200 mt-6">
      <h2 className="text-lg font-semibold text-slate-700">SubTotal:</h2>
      <span className="text-xl font-bold text-green-600">
        Total:{currencyFormatter.format(totalPrice)}
      </span>
    </div>
  );
};
export default CartTotal;
