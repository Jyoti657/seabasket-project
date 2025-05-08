import React, { useState } from "react";
import InputPayment from "./InputPayment";
import Button from "../components/ui/Button";

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Card details submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputPayment
        label="Card Number"
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="1234 5678 9012 3456"
        required
      />
      <div className="flex gap-4">
        <InputPayment
          label="Expiry Date"
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="MM/YY"
          required
        />
        <InputPayment
          label="CVV"
          type="Password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="123"
          required
        />
      </div>
      <Button
        label="Pay Now"
        type="submit"
        className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-green-700 transition"
      />
    </form>
  );
};

export default CreditCardForm;
