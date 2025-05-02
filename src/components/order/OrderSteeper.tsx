import { CheckCircle, Truck, Package, Home, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  status: string;
}

const OrderSteeper: React.FC<Props> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const isActive = (step: string) => {
    const steps = [
      "Processing",
      "Shipped",
      "out for Delivery",
      "Delivered",
      "orderConfirmed",
      "Cancelled",
      "Returned",
    ];
    return steps.indexOf(currentStatus) >= steps.indexOf(step);
  };
  const isCancelled =
    currentStatus === "Cancelled" || currentStatus === "Returned";

  return (
    <div className="px-4 ">
      <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-4">
        <li className="mb-10 ms-6 relative">
          <span
            className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
              isActive("Processing")
                ? "bg-green-200 text-green-800 dark:bg-green-900"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
          </span>
          <h3 className="font-medium leading-tight text-gray-900 dark:text-white m-9">
            Order Confirmed
          </h3>
        </li>
        {!isCancelled && (
          <>
            <li className="mb-10 ms-6 relative">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
                  isActive("Shipped")
                    ? "bg-blue-200 text-blue-800 dark:bg-blue-900"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700"
                }`}
              >
                <Truck className="w-4 h-4 m-3" />
              </span>
              <h3 className="font-medium leading-tight text-gray-900 dark:text-white m-9">
                Shipping
              </h3>
            </li>

            <li className="mb-10 ms-6 relative">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
                  isActive("out for Delivery")
                    ? "bg-yellow-200 text-pink-800 dark:bg-pink-900"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700"
                }`}
              >
                <Package className="w-4 h-4" />
              </span>
              <h3 className="font-medium leading-tight text-gray-900 dark:text-white m-9">
                Out for Delivery
              </h3>
            </li>

            <li className="ms-6 relative">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
                  isActive("Delivered")
                    ? "bg-green-300 text-green-900 dark:bg-green-700"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700"
                }`}
              >
                <Home className="w-4 h-4" />
              </span>
              <h3 className="font-medium leading-tight text-gray-900 dark:text-white m-9">
                Delivered
              </h3>
            </li>
          </>
        )}
        {isCancelled && (
          <li className=" relative ms-6">
            <span
              className="absolute flex items-center justify-center w-8 h-8 rounded-full 
              -start-4 ring-4 ring-white bg-red-200 text-red-800 dark:bg-red-900 dark:ring-gray-900"
            >
              <XCircle className="w-4 h-4" />
            </span>
            <h3 className="font-medium leading-tight text-red-600 dark:text-red-400 m-9">
              {currentStatus === "Returned"
                ? "Order Returned"
                : "Order Cancelled"}
            </h3>
          </li>
        )}
      </ol>
    </div>
  );
};

export default OrderSteeper;
