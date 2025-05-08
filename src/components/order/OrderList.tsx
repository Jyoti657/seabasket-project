import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserOrder } from "../../store/Slice/orderSlice";
import OrderCard from "./OrderCard";

const OrderList: React.FC = () => {
  const naviagate = useNavigate();
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  const handleOrderDetails = (id: number) => {
    naviagate(`/order/${id}`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-soft_mint text-center bg-teal-700">
        My Orders
      </h2>

      <div className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onOrderClick={handleOrderDetails}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};
export default OrderList;
