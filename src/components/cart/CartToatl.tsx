import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/Slice/cartSlice";
import { currencyFormatter } from "../../util/formatting";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";
import { calculateTotalAmount } from "../../util/calculateTotalAmount";

const CartTotal: React.FC = () => {
  const subtotal = useSelector(selectCartTotal);
  const{total,tax,shipping}=calculateTotalAmount(subtotal)


  return (
    <div className="w-full max-w-md mx-auto bg-soft_mint rounded-2xl shadow-md border border-gray-200 p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Summary</h2>

      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currencyFormatter.format(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{currencyFormatter.format(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>{currencyFormatter.format(tax)}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total</span>
          <span>{currencyFormatter.format(total)}</span>
        </div>
      </div>

      <NavLink to="/order">
        <Button
          label="Proceed to order"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-900 text-white font-semibold py-2 rounded-xl"
        />
      </NavLink>
    </div>
  );
};
export default CartTotal;
