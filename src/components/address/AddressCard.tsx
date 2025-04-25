import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchAddress } from "../../store/Slice/addressSlice";

const AddressCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const shipping = useSelector((state: RootState) => state.address.list);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isLoading = useSelector((state: RootState) => state.address.isLoading);
  const error = useSelector((state: RootState) => state.address.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddress(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) return <p className="text-center mt-10">Loading....</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;

  return (
    <div className="space-y-4 bg-slate-400">
      <ol className="space-y-2">
      {shipping && shipping.length > 0 ? (
  shipping
    .filter((address) => address !== null) 
    .map((address, index) => (
      <li key={address.id || index} className="border p-4 rounded shadow">
        <p>{address.addressLine1}</p>
        <p>
          {address.city}, {address.state}, {address.addressLine2}
        </p>
        <p>{address.country}</p>
        <p>{address.postalCode ?? "No PIN available"}</p>
      </li>
    ))
) : (
  <p className="text-center mt-10">No addresses available</p>
)}

      </ol>
    </div>
  );
};

export default AddressCard;
