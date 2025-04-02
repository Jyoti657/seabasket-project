
import { InputProps } from "../../types";
import { FieldValues } from "react-hook-form";

const Input= <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  validation,
  error,
}: InputProps<T>) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
