import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import RestartCart from "../components/cart/ReSetCart";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../store/store";
import { ProductProps } from "../types";
import Button from "../components/ui/Button";
import CartProducts from "../components/cart/CartProducts";
import { fetchCart } from "../store/Slice/cartSlice";
import CartTotal from "../components/cart/CartToatl";

const Cart: React.FC = () => {
  const { productData } = useSelector((state: RootState) => state.cart);

  const [isModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!productData) {
      return console.log("cart is empty");
    }
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex flex-col lg:flex-row gap-6 justify-center">
      {productData && productData.length > 0 ? (
        <>
          <div
            className={`w-full lg:w-3/4 bg-soft_mint shadow-md rounded-lg p-6 space-y-6 ${
              isModalOpen ? "blur-sm" : ""
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
              Your Items
            </h2>

            <div className="space-y-4">
              {productData.map((item: ProductProps) => (
                <CartProducts key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-4 border-t flex justify-end">
              <RestartCart />
            </div>
          </div>
          <div className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4">
              Cart Summary
            </h3>
            <CartTotal />
            <div>
              <NavLink to="/checkout">
                <Button
                  label="Checkout"
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-900 text-white font-semibold py-2 rounded-xl"
                />
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Your cart is empty. Add products!
          </h1>
          <NavLink to={"/"}>
            <Button label="Go to Shopping" className="" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
