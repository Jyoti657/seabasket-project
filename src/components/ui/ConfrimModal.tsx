import { confirmModalProps } from "../../types";

const Confirm: React.FC<confirmModalProps> = ({
  isOpne,
  onClose,
  OnConfrim,
  message,
  ConfirmText = "Confrim",
  CanelText = "Canel",
}) => {
  if (!isOpne) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
        >
          {CanelText}
        </button>
        <button 
        onClick={OnConfrim}
        className=" bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
        >{ConfirmText}</button>
      </div>
    </div>
  );
};
export default Confirm;
