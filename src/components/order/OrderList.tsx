import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { currencyFormatter } from "../../util/formatting";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserOrder } from "../../store/Slice/orderSlice";

const OrderList: React.FC = () => {
  const naviagate = useNavigate();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  const handleOrderDetails = (id: number) => {
    naviagate(`/order/${id}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              onClick={() => handleOrderDetails(order.id)}
              key={order.id}
              className="flex cursor-pointer items-center gap-4 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <img
                src={order.image}
                alt={order.productName}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">
                  {order.productName}
                </p>
                <p className="text-sm text-gray-600">
                  {currencyFormatter.format(order.price)}
                </p>
                <span
                  className={` mt-1 text-xs font-semibold px-2 py-1 rounded ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No order Found</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
