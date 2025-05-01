// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { orderPlace } from "../../store/Slice/orderSlice";




// const OrderPlacementForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error, orders } = useSelector((state: RootState) => state.order);

//   const [paymentType, setPaymentType] = useState("COD");
//   const [addressId, setAddressId] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!addressId) {
//       alert("Please enter your address ID.");
//       return;
//     }

//     dispatch(orderPlace({ paymentType, addressId }));
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
//       <h2 className="text-xl font-bold mb-4">Place Your Order</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Address ID"
//           value={addressId}
//           onChange={(e) => setAddressId(e.target.value)}
//           className="border p-2 w-full"
//         />

//         <select
//           value={paymentType}
//           onChange={(e) => setPaymentType(e.target.value)}
//           className="border p-2 w-full"
//         >
//           <option value="COD">Cash on Delivery</option>
//           <option value="PREPAID">Online Payment</option>
//         </select>

//         <button
//           type="submit"
//           disabled={status === "loading"}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {status === "loading" ? "Placing Order..." : "Place Order"}
//         </button>

//         {error && <p className="text-red-500">{error}</p>}
//         {orders && <p className="text-green-600">Order placed successfully! ID: {orders.id}</p>}
//       </form>
//     </div>
//   );
// };

// export default OrderPlacementForm;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { orderPlace } from "../../store/Slice/orderSlice";

const OrderPlacementForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, orders } = useSelector((state: RootState) => state.order);

  const [paymentType, setPaymentType] = useState("COD");
  const [addressId, setAddressId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!addressId.trim()) {
      alert("Please enter your address ID.");
      return;
    }

    dispatch(orderPlace());
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Place Your Order</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Address ID"
          value={addressId}
          onChange={(e) => setAddressId(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="PREPAID">Online Payment</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {orders && orders.length > 0 && (
          <p className="text-green-600">
            Order placed successfully! ID: {orders[orders.length - 1].id}
          </p>
        )}
      </form>
    </div>
  );
};

export default OrderPlacementForm;
