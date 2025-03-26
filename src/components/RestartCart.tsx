import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../store/slice";

const RestartCart: React.FC = () => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetCart = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    dispatch(resetCart());
    setShowConfirm(false);
  };

  return (
    <div>
      <button
        onClick={handleResetCart}
        className=" bg-seabasket_green text-white px-4 py-2 rounded-md hover:bg-red-700 transition  cursor-pointer"
      >
        Reset Cart
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <p className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete all products from the cart?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestartCart;
