import { useParams } from "react-router-dom";
import { order } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { currencyFormatter } from "../util/formatting";
import OrderSteeper from "../components/order.tsx/OrderSteeper";

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const orderAll = useSelector((state: RootState) => state.order.orders);
  const orderId = Number(id);
  const order: order | undefined = orderAll?.find((p) => p.id === orderId);

  if (!order) {
    return (
      <p className="text-red-500 text-center">
        Product not found. Please check the ID or refresh the page.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-soft_mint flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  ">
        <div className="flex flex-col items-center lg:items-start gap-6">
          <img
            src={order.image}
            alt={order.productName}
            className="w-96 h-46 object-contain border border-gray-300 p-4 rounded-xl shadow"
          />
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {order.productName}
            </h1>
            <p className="text-xl text-green-600 font-semibold">
              {currencyFormatter.format(order.price)}
            </p>
            <p className="text-sm  font-semibold text-gray-900">
              Excepted date:{order.date}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <OrderSteeper status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
