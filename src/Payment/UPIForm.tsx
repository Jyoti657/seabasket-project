import React, { useState } from "react";
import Button from "../components/ui/Button";
import InputPayment from "./InputPayment";

const UPIForm: React.FC = () => {
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`UPI ID submitted: ${upiId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputPayment
        label="UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="example@upi"
        required
      />
      <Button
        type="submit"
        label="Pay Now"
        className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-green-700 transition"
      />
    </form>
  );
};

export default UPIForm;
