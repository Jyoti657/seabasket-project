import { useSelector } from "react-redux";
import AddressForm from "../components/address/AddressForm";
import { RootState } from "../store/store";

const AddressPage: React.FC = () => {
  const shipping = useSelector((state: RootState) => state.address.list);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
     
      {shipping.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Saved Shipping Addresses
          </h3>
          <div className="space-y-3">
            {shipping.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl bg-gray-50 shadow-sm"
              >
                <p className="text-gray-700 font-medium">{item.fullname}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Add / Edit Address
        </h3>
        <AddressForm />
      </div>
    </div>
  );
};

export default AddressPage;
