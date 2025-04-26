import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchAddress } from "../../store/Slice/addressSlice";
import { MapPin, Mail, Globe, Landmark } from "lucide-react";

const AddressCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shipping = useSelector((state: RootState) => state.address.list);
  const isLoading = useSelector((state: RootState) => state.address.isLoading);
  const error = useSelector((state: RootState) => state.address.error);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6 px-4 py-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
      <ol className="space-y-4">
        {shipping && shipping.length > 0 ? (
          shipping.map((address, index) => (
            <li
              key={address?.id || index}
              className="border border-gray-200 p-4 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                <MapPin size={18} />
                {address?.addressLine1 ?? "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                {address?.addressLine2 && `${address.addressLine2}, `}
                {address?.city ?? "N/A"}, {address?.state ?? "N/A"}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Globe size={16} />
                {address?.country ?? "N/A"}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <Landmark size={16} />
                {address?.postalCode ?? "No PIN available"}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No addresses available.</p>
        )}
      </ol>
    </div>
  );
};

export default AddressCard;
