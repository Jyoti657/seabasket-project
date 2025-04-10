
import React, { useState } from "react";
import CashForm from "../payment/CashForm";
import CreditCardForm from "../payment/CreditCardForm";
import UPIForm from "../payment/UPIForm";

const PaymentForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-200 mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Select Payment Method</h2>

      <div className="space-y-4">
     
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="upi"
            name="payment"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-seabasket_green"
          />
          <label htmlFor="upi" className="text-gray-700 font-medium">
            UPI
          </label>
        </div>
        {paymentMethod === "upi" && <UPIForm />}

   
       

      
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-seabasket_green"
          />
          <label htmlFor="card" className="text-gray-700 font-medium">
            Credit/Debit Card
          </label>
        </div>
        {paymentMethod === "card" && <CreditCardForm />}
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="accent-seabasket_green"
          />
          <label htmlFor="cash" className="text-gray-700 font-medium">
            Cash
          </label>
        </div>
        {paymentMethod === "cash" && <CashForm />}
      </div>
    </div>
  );
};

export default PaymentForm;
