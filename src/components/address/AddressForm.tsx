import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addressSchema, { addressSchemaType } from "../../schema/addressSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addAddress } from "../../store/Slice/addressSlice";

const AddressForm: React.FC = () => {
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
        console.log("Add Adreess");
      }
    } catch (err) {
      console.log(" address is not add");
    }

    console.log(data);
  };

  return (
    <div className=" grid grid-row">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Enter Your Address</h2>

        <div>
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            {...register("addressLine1")}
            className="w-full border rounded p-2"
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm">
              {errors.addressLine1.message}
            </p>
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
            <p className="text-red-500 text-sm">
              {errors.addressLine2.message}
            </p>
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
