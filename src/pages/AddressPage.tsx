import { useSelector } from "react-redux";
import AddressForm from "../components/address/AddressForm";
import { RootState } from "../store/store";
import AddressCard from "../components/address/AddressCard";

const AddressPage: React.FC = () => {
  // const shipping = useSelector((state: RootState) => state.address.list);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* {shipping && (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Shipping Addresses
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <span className="font-medium">Name</span>
            </p>
            {/* {shipping.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-xl bg-gray-50 shadow-sm"
              >
                <p className="text-gray-700 font-medium">{item.fullname}</p>
              </div>
            ))} 
            <AddressCard />
          </div>
        </div>
      )} */}  
       <AddressCard/> 

      {/* <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Add / Edit Address
        </h3>
        <AddressForm />
      </div> */}
    </div>
  );
};

export default AddressPage;
