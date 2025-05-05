import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addressSchema, { addressSchemaType } from "../../schema/addressSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addAddress, fetchAddress } from "../../store/Slice/addressSlice";

interface AddressFormProps {
  onClose?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addressSchemaType>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<addressSchemaType> = async (data) => {
    try {
      const resultAction = await dispatch(addAddress(data));
      if (addAddress.fulfilled.match(resultAction)) {
        await dispatch(fetchAddress());
      }
    } catch (error) {
      console.error(" address is not add");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-soft_mint rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-center ">Enter Your Address</h2>

      <div>
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          type="text"
          {...register("addressLine1")}
          className="w-full border rounded p-2"
        />
        {errors.addressLine1 && (
          <p className="text-red-500 text-sm">{errors.addressLine1.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Address Line 2</label>
        <input
          type="text"
          {...register("addressLine2")}
          className="w-full border rounded p-2"
        />
        {errors.addressLine2 && (
          <p className="text-red-500 text-sm">{errors.addressLine2.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Postal Code</label>
        <input
          type="text"
          {...register("postalCode")}
          className="w-full border rounded p-2"
        />
        {errors.postalCode && (
          <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">State</label>
        <input
          type="text"
          {...register("state")}
          className="w-full border rounded p-2"
        />
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <input
          type="text"
          {...register("city")}
          className="w-full border rounded p-2"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Country</label>
        <input
          type="text"
          {...register("country")}
          className="w-full border rounded p-2"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>
        <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
        onClick={onClose}
      >
        Save Address
      </button>        
    </form>
  );
};

export default AddressForm;
