import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import CartProducts from "../components/cart/CartProducts";
import RestartCart from "../components/cart/ReSetCart";
import { useState } from "react";
import { RootState } from "../store/store";
import { StoreProduct } from "../types";
import Button from "../components/ui/Button";
import CartTotal from "../components/cart/CartToatl";

const Cart: React.FC = () => {
  const  productData = useSelector((state: RootState) => state.cart.productData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {productData.length > 0 ? (
        <div
          className={`w-full max-w-4xl bg-white p-6 rounded-lg shadow-md transition ${
            isModalOpen ? "blur-sm" : ""
          }`}
        >
          <div className="flex justify-between items-center border-b pb-4">
            <p className="text-xl font-semibold text-gray-800">Your Items</p>
          </div>

          <div className="mt-4 space-y-4">
            {productData.map((item: StoreProduct) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <CartProducts item={item} />
              </div>
            ))}
          </div>
          <CartTotal />
          <div className="mt-6 flex justify-between items-center">
            <RestartCart />
            <NavLink to="/checkout">
              <Button label="Procced to checkout" 
              className=""
              />
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty. Add products!
          </h1>
          <NavLink to={"/"}>
            <Button className="" label="Go to Shopping" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
