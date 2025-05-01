import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { orderPlace } from "../../store/Slice/orderSlice";
import { resetCart } from "../../store/Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutButton = () => {
    const dispatch = useDispatch<AppDispatch>();
  const navigate=  useNavigate()
    const selectedAddressId = useSelector((state: RootState) => state.order.selectedAddressId); 
    const addressId = selectedAddressId; 
    const paymentType = "Cash on Delivery"; 
  
    const handlePlaceOrder = () => {
      dispatch(orderPlace({ paymentType, addressId }))
        .unwrap()
        .then((data) => {
          alert(data);
          dispatch(resetCart()); 
          navigate("/order-success");
        })
        .catch((err) => {
          alert(err);
        });
    };
  
    return <button onClick={handlePlaceOrder}>Place Order</button>;
  };
export default CheckoutButton