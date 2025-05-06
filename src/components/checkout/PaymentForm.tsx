import React from "react";
import CashForm from "../../Payment/CashForm";
import CreditCardForm from "../../Payment/CreditCardForm";
import UPIForm from "../../Payment/UPIForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setSelectedPaymentType } from "../../store/Slice/orderSlice";

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

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="upi"
            name="payment"
            value="upi"
            checked={selectedPayment === "upi"}
            onChange={() => handlePaymentChange("upi")}
            className="accent-seabasket_green"
          />
          <label htmlFor="upi" className="text-gray-700 font-medium">
            UPI
          </label>
        </div>
        {selectedPayment === "upi" && <UPIForm />}

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={selectedPayment === "card"}
            onChange={() => handlePaymentChange("card")}
            className="accent-seabasket_green"
          />
          <label htmlFor="card" className="text-gray-700 font-medium">
            Credit/Debit Card
          </label>
        </div>
        {selectedPayment === "card" && <CreditCardForm />}

        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            checked={selectedPayment === "cash"}
            onChange={() => handlePaymentChange("cash")}
            className="accent-seabasket_green"
          />
          <label htmlFor="cash" className="text-gray-700 font-medium">
            Cash
          </label>
        </div>
        {selectedPayment === "cash" && <CashForm />}
      </div>
    </div>
  );
};

export default PaymentForm;
