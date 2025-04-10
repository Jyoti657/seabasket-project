import Cart from "./CartPage";

const Checkout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Checkout;
