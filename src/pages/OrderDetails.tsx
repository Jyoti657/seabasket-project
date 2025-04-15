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
    <div className="min-h-screen bg-soft_mint flex justify-center items-start p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center md:items-start gap-6">
          <img
            src={order.image}
            alt={order.productName}
            className="w-64 h-64 object-contain border border-gray-300 p-4 rounded-lg shadow"
          />

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {order.productName}
            </h1>
            <p className="text-lg text-green-600 font-semibold mt-2">
              {currencyFormatter.format(order.price)}
            </p>
          </div>

          <button className="bg-seabasket_green text-soft_mint px-6 py-2 rounded-md hover:bg-green-700 transition">
            See All Updates
          </button>
        </div>
        <div>
            <OrderSteeper/>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
