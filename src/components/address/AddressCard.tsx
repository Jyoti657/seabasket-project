import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { deleteAddress, fetchAddress } from "../../store/Slice/addressSlice";
import { MapPin, Globe, Landmark } from "lucide-react";
import Button from "../ui/Button";
import { addressForm } from "../../types";
import UpdateAddressForm from "./UpdateAddress";
import { setSelectedAddressId } from "../../store/Slice/orderSlice";
import AddressItem from "./AddressItems";

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
    <>
      {editingAddress ? (
        <UpdateAddressForm
          address={editingAddress}
          onClose={() => setEditingAddress(null)}
        />
      ) : (
        <>
          {shipping.length > 0 ? (
            shipping.map((address, index) => (
              <AddressItem
                key={address.id ?? index}
                address={address}
                isSelected={selectedAddress === address.id?.toString()}
                onSelect={(id) => dispatch(setSelectedAddressId(id))}
                onEdit={(address) => setEditingAddress(address)}
                onDelete={(id) => dispatch(deleteAddress(id))}
              />
            ))
          ) : (
            <p className="text-center text-soft_mint">
              No addresses saved yet.
            </p>
          )}
        </>
      )}
    </>
  );
};

export default AddressCard;
