import React from "react";
import CashForm from "../../Payment/CashForm";
import CreditCardForm from "../../Payment/CreditCardForm";
import UPIForm from "../../Payment/UPIForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setSelectedPaymentType } from "../../store/Slice/orderSlice";
import PaymentOption from "./PaymentOption";

const PaymentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePaymentChange = (method: string) => {
    dispatch(setSelectedPaymentType(method));
  };

  const selectedPayment = useSelector(
    (state: RootState) => state.order.selectedPaymentType
  );

  return (
    <div className="w-full max-w-md mx-auto bg-soft_mint rounded-xl shadow-md p-6 border border-gray-200 mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Select Payment Method
      </h2>

      <div className=" space-y-4">
        <PaymentOption
          id="upi"
          label="UPI"
          selected={selectedPayment}
          onChange={handlePaymentChange}
        >
          <UPIForm />
        </PaymentOption>
      </div>
      <div className="space-y-4">
        <PaymentOption
          id="Cash"
          label="Cash"
          selected={selectedPayment}
          onChange={handlePaymentChange}
        >
          <CashForm />
        </PaymentOption>
      </div>
      <div className="space-y-4">
        <PaymentOption
          id="card"
          label="Credit/Debit Card"
          selected={selectedPayment}
          onChange={handlePaymentChange}
        >
          <CreditCardForm />
        </PaymentOption>
      </div>
    </div>
  );
};

export default PaymentForm;
