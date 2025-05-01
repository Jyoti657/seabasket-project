import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { deleteAddress, fetchAddress } from "../../store/Slice/addressSlice";
import { MapPin, Globe, Landmark } from "lucide-react";
import Button from "../ui/Button";
import { addressForm } from "../../types";
import UpdateAddressForm from "./UpdateAddress";
import { setSelectedAddressId } from "../../store/Slice/orderSlice";

const AddressCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shipping = useSelector((state: RootState) => state.address.list);
  const selectedAddress = useSelector(
    (state: RootState) => state.order.selectedAddressId
  );
  const isLoading = useSelector((state: RootState) => state.address.isLoading);
  const [editingAddress, setEditingAddress] = useState<addressForm | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="bg-seabasket_green rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Saved Addresses</h2>

      {editingAddress ? (
        <UpdateAddressForm
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols">
          {shipping.length > 0 ? (
            shipping.map((address, index) => {
              if (!address) return null;

              return (
                <div
                  key={address.id ?? index}
                  className={`p-4 border rounded-md mb-2 cursor-pointer relative ${
                    selectedAddress === address.id?.toString()
                      ? "border-green-500 bg-slate-400"
                      : ""
                  }`}
                  onClick={() =>
                    address.id &&
                    dispatch(setSelectedAddressId(address.id.toString()))
                  }
                >
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button
                      label="Update"
                      onClick={() => setEditingAddress(address)}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 py-1 rounded-md"
                    />
                    <Button
                      label="Delete"
                      onClick={() =>
                        address.id && dispatch(deleteAddress(address.id))
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                    />
                  </div>

                  <div className="space-y-2 mt-3 ">
                    <p className="text-lg font-medium text-teal-100 flex items-center gap-2 mt-1">
                      <MapPin size={18} />
                      {address?.addressLine1}
                    </p>
                    <p className="text-sm text-soft_mint mt-1">
                      {address?.addressLine2 && `${address.addressLine2}, `}
                      {address?.city}, {address?.state}
                    </p>
                    <p className="text-sm text-soft_mint mt-1 flex items-center gap-2">
                      <Globe size={16} />
                      {address?.country}
                    </p>
                    <p className="text-sm text-soft_mint mt-1 flex items-center gap-2">
                      <Landmark size={16} />
                      {address?.postalCode}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-soft_mint">
              No addresses saved yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressCard;
