import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { addressSchemaType } from "../../schema/addressSchema";
import Button from "../ui/Button";

interface AddressesProps {
  formMethods: UseFormReturn<addressSchemaType>;
  onSubmit: SubmitHandler<addressSchemaType>;
  submitlabel?: string;
  onCancel?: () => void;
  title?: string;
}

const BasedAddress: React.FC<AddressesProps> = ({
  formMethods,
  onSubmit,
  submitlabel = "Save",
  onCancel,
  title = "Enter Your Address",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-soft_mint rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {[
        { label: "Address Line 1", name: "addressLine1" },
        { label: "Address Line 2", name: "addressLine2" },
        { label: "Postal Code", name: "postalCode" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Country", name: "country" },
      ].map(({ label, name }) => (
        <div key={name} className="flex flex-col space-y-1">
          <label className="block font-medium">{label}</label>
          <input
            type="text"
            {...register(name as keyof addressSchemaType)}
            className="block w-full p-2 rounded-md border border-gray-300 focus:outline-none"
          />
          {errors[name as keyof addressSchemaType] && (
            <span className="text-sm text-red-500">
              {errors[name as keyof addressSchemaType]?.message as string}
            </span>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <Button
          label={submitlabel}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          type="submit"
        />
        {onCancel && (
          <Button
            label="Cancel"
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
          />
        )}
      </div>
    </form>
  );
};

export default BasedAddress;
