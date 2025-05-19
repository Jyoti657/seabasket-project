import React from "react";
import { FieldError } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  register: any;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  error,
  register,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className={`mt-1 block w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInput;
