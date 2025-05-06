import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "../../store/store";
import { fetchAddress, updateAddress } from "../../store/Slice/addressSlice";
import addressSchema, { addressSchemaType } from "../../schema/addressSchema";

interface UpdateAddressFormProps {
  address: addressSchemaType & { id: string };
  onClose: () => void;
}

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
  address,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addressSchemaType>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (address) {
      reset({
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      });
    }
  }, [address, reset]);

  const onSubmit: SubmitHandler<addressSchemaType> = async (data) => {
    try {
      const resultAction = await dispatch(
        updateAddress({ id: address.id, updateaddress: data })
      );

      if (updateAddress.fulfilled.match(resultAction)) {
        await dispatch(fetchAddress());
        onClose();
      }
    } catch (error) {
      console.error(" Failed to update address:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Update Address</h2>

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

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
        >
          Update Address
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateAddressForm;
