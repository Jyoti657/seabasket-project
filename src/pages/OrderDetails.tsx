import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { orderStatus } from "../store/Slice/orderSlice";
import OrderSteeper from "../components/order/OrderSteeper";
import { currencyFormatter } from "../util/formatting";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const orderId = Number(id);
  const orders = useSelector((state: RootState) => state.order.orders);

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (id) {
      dispatch(orderStatus(id));
    }
  }, [dispatch, id]);

  if (!order) {
    return (
      <p className="text-red-500 text-center mt-10">
        Order not found. Please check the ID or refresh the page.
      </p>
    );
  }

  const totalPrice = order.orderItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-soft_mint flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl w-full space-y-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Order #{order.id}
          </h2>
          <p className="text-gray-600 text-sm">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <OrderSteeper orderId={order.id.toString()} status={order.status} />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Items in this order
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.orderItems?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 border border-gray-200 bg-gray-50 rounded-xl p-4 shadow-sm"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-32 h-32 object-contain rounded-lg border p-2"
                />
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="text-lg font-bold text-gray-800">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.product.description}
                  </p>
                  <p className="text-green-600 font-semibold">
                    {currencyFormatter.format(item.price)}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 flex justify-end">
          <div className="text-right space-y-2">
            <p className="text-gray-700 text-lg font-semibold">
              Total Amount:{" "}
              <span className="text-green-600">
                {currencyFormatter.format(totalPrice || 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
