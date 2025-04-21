
const Checkout: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-4xl mx-auto mt-20 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-seabasket_green text-white flex flex-col justify-center items-start p-8">
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-lg mb-1">Thank you for your order!</p>
          <p className="text-sm text-gray-700">
            Your order is being processed.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8">
          {/* Checkout form or summary goes here */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
