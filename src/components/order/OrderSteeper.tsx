import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { orderStatus } from "../../store/Slice/orderSlice";

interface OrderStepperProps {
  status: string;
  orderId:string
}

const steps = ["Pending", "Shipped", "Out for Delivery", "Delivered"];

const OrderStepper: React.FC<OrderStepperProps> = ({ status,orderId }) => {
  const currentStepIndex = steps.indexOf(status);
  const safeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  const dispatch= useDispatch<AppDispatch>()
  useEffect(() => {
    if(orderId){
      dispatch(orderStatus(orderId));

    }
  }, [dispatch,orderId]);
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mt-8">
      {steps.map((step, index) => (
        <div
          key={step}
          className="flex-1 relative flex flex-col items-center text-center"
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white z-10
              ${index <= safeStepIndex ? "bg-teal-700" : "bg-gray-300"}
            `}
          >
            {index + 1}
          </div>

          <div className="mt-2 text-sm font-medium">{step}</div>

          {index < steps.length - 1 && (
            <div
              className={`absolute top-4 left-full h-1 w-full -ml-4
                ${index < currentStepIndex ? "bg-blue-600" : "bg-gray-300"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStepper;
