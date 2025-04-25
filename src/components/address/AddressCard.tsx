import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchAddress } from "../../store/Slice/addressSlice";
import { addressForm } from "../../types";

const AddressCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { list, isLoading, error } = useSelector(
    (state: RootState) => state.address
  );
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress(user.id));
    }
  });
  if (isLoading) return <p className="text-center mt-10">Loading....</p>;
  if (error) return <p className=" text-center mt-10">Error:{error}</p>;

  return (
    <>
      <div className=" space-y-4">
      <ol className="space-y-2">
  {/* {list.map((address: addressForm) => (
    <li key={address.id} className="border p-4 rounded shadow">
      <p>{address.addressLine1}, {address.addressLine2}</p>
      <p>{address.city}, {address.state}, {address.postalCode}</p>
      <p>{address.country}</p>
    </li>
  ))} */}
</ol>


      </div>
    </>
  );
};
export default AddressCard;
