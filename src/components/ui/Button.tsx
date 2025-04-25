import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({ label, onClick, className ,type}) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`px-6 py-2 rounded-md transition ${
          className || "text-black bg-seabasket_green"
        }`}
      >
        {label}
      </button>
    </>
  );
};
export default Button;
