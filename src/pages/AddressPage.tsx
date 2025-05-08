import AddressForm from "../components/address/AddressForm";
import AddressCard from "../components/address/AddressCard";

const AddressPage: React.FC = () => {
  return (
    <div className=" mx-auto px-4 py-8 bg-soft_mint">
      <h1 className="text-3xl font-bold text-center sm:text text-gray-800 mb-8">
        Manage Your Addresses
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-teal-800 rounded-lg shadow-md p-6">
          <AddressForm />
        </div>
        <div className="bg-teal-700 rounded-lg shadow-md p-6 overflow-y-auto max-h-[80vh]">
          <AddressCard />
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
