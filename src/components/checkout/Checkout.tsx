import { useNavigate } from "react-router-dom";
import CartTotal from "../cart/CartToatl";
import Button from "../ui/Button";
import AddressCard from "../address/AddressCard";
import PaymentForm from "./PaymentForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import AddressForm from "../address/AddressForm";
import CheckoutButton from "./CheckoutButton";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [showAddAddress, setShowAddAddress] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto my-10 px-4">
      <div className="shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row bg-white">
        <div className="w-full md:w-1/2 bg-seabasket_green text-white p-6 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <PaymentForm />
          <CartTotal />
        </div>

        <div className="w-full md:w-1/2 p-6 bg-soft_mint flex flex-col justify-between">
          <div className="flex-grow">
            <AddressCard />
            <Button
              label="ADD New Address"
              className="w-full bg-teal-600 hover:bg-teal-900 text-white font-semibold py-2 rounded-xl mt-5"
              onClick={() => setShowAddAddress(true)}
            />
            {showAddAddress && (
              <div className="mt-4">
                <AddressForm onClose={() => setShowAddAddress(false)} />
              </div>
            )}

            <CheckoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
