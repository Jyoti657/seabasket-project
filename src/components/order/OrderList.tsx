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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
      <div className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Order #{order.id}
              </h3>

              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => handleOrderDetails(order.id)}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currencyFormatter.format(item.product.price)} &times;{" "}
                        {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Discount: {item.product.discount}%
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.product.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products in this order</p>
              )}
            </div>
          ))
        ) : (
          <p>No order found</p>
        )}
      </div>
    </div>
  );
};
export default OrderList;
