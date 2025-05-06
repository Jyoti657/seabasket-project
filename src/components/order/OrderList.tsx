import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { currencyFormatter } from "../../util/formatting";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserOrder } from "../../store/Slice/orderSlice";

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
            <div
              key={order.id}
              className="p-4 sm:p-5 border rounded-xl bg-soft_mint shadow-sm hover:shadow-md transition "
            >
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => handleOrderDetails(order.id)}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer border-b last:border-none py-3"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-black truncate">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-slate-700">
                        {currencyFormatter.format(item.product.price)}
                      </p>
                      <p>{item.quantity}</p>
                      <p className="text-sm text-slate-700">
                        Discount: {item.product.discount}%
                      </p>
                      <p className="text-sm text-slate-700 line-clamp-2">
                        {item.product.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No products in this order.
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};
export default OrderList;
