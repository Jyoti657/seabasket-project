import React from "react";
import Button from "../components/ui/Button";

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
      <Button
        label="Confirm cash On Delivery"
        type="submit"
        className="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px"
      />
    </form>
  );
};

export default CashForm;
