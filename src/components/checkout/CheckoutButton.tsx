import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getUserOrder, orderPlace } from "../../store/Slice/orderSlice";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";
import { resetCart } from "../../store/Slice/cartSlice";

const CheckoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedAddressId = useSelector(
    (state: RootState) => state.order.selectedAddressId
  );
  const paymentId=useSelector((state:RootState)=>state.order.selectedPaymentType)
  const addressId = selectedAddressId;
  const paymentType = "Cash on Delivery";

  const handlePlaceOrder = async () => {
    dispatch(orderPlace({ paymentType, addressId }));
    dispatch(resetCart());
    dispatch(getUserOrder());
  };

  return (
    <>
      <NavLink to="/order">
        <Button
          label="PlaceOrder"
          className="text-xl cursor-pointer bg-teal-900 hover:bg-teal-950 text-white items-center py-2 rounded-md w-full sm:w-auto mt-8"
          onClick={handlePlaceOrder}
        />
      </NavLink>
    </>
  );
};
export default CheckoutButton;
