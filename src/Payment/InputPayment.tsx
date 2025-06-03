interface InputPaymentProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}
const InputPayment: React.FC<InputPaymentProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  className,
}) => {
  return (
    <>
      <label className={`block text-gray-700 font-medium ${className}`}>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-seabasket_green"
        />
      </label>
    </>
  );
};
export default InputPayment;
