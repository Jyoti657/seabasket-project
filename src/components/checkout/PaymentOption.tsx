interface PaymentOptionProps {
  id: string;
  label: string;
  selected: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  id,
  label,
  selected,
  onChange,
  children,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id={id}
          name="Payment"
          value={id}
          checked={selected === id}
          onChange={() => onChange(id)}
          className="bg-seabasket_green"
        />
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
      </div>
      {selected === id && children}
    </>
  );
};
export default PaymentOption;
