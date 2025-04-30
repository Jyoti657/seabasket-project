import React, { useState } from "react";

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
      <label className="block text-gray-700 font-medium">
        Card Number
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-seabasket_green"
        />
      </label>

      <div className="flex gap-4">
        <label className="block text-gray-700 font-medium w-1/2">
          Expiry Date
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-seabasket_green"
          />
        </label>

        <label className="block text-gray-700 font-medium w-1/2">
          CVV
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-seabasket_green"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CreditCardForm;
