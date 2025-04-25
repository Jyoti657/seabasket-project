import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/Slice/cartSlice";
import Confirm from "../ui/ConfrimModal";
import Button from "../ui/Button";

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
    <>
      <Button
        label="Reset"
        className=" bg-seabasket_green text-white px-4 py-2 rounded-md hover:bg-red-700 transition  cursor-pointer"
        onClick={handleResetCart}
      />

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        OnConfirm={confirmReset}
        message="Are you sure you want want to delete all products from  the cart?"
        ConfirmText="Yes,Delete"
        CancelText="Cancel"
      />
    </>
  );
};

export default RestartCart;
