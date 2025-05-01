import React from "react";

const CashForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cash on Delivery selected");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-700">
        You can pay in cash when the product is delivered to your doorstep.
      </p>
      <button
        type="submit"
        className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Confirm Cash on Delivery
      </button>
    </form>
  );
};

export default CashForm;
