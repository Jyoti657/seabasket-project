import React, { useState } from "react";

const UPIForm: React.FC = () => {
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`UPI ID submitted: ${upiId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-gray-700 font-medium">
        UPI ID
        <input
          type="text"
          placeholder="example@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-seabasket_green"
        />
      </label>
      <button
        type="submit"
        className="bg-seabasket_green text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        Pay Now
      </button>
    </form>
  );
};

export default UPIForm;
