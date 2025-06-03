import { MapPin, Globe, Landmark } from "lucide-react";
import { addressForm } from "../../types";
import Button from "../ui/Button";

interface AddressItemProps {
  address: addressForm;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (address: addressForm) => void;
  onDelete: (id: string) => void;
}
const AddressItem: React.FC<AddressItemProps> = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  if (!address) return null;
  return (
    <>
      <div
        className={`p-4 border rounded-md mb-2 cursor-pointer relative ${
          isSelected ? "border-teal-400 bg-slate-400" : ""
        }`}
        onClick={() => address.id && onSelect(address.id.toString())}
      >
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            label="Update"
            onClick={() => {
              onEdit(address);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-3 py-1 rounded-md"
          />
          <Button
            label="Delete"
            onClick={() => {
              address.id && onDelete(address.id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md"
          />
        </div>

        <div className="space-y-2 mt-3">
          <p className="text-lg font-medium text-teal-100 flex items-center gap-2 mt-1">
            <MapPin size={18} />
            {address?.addressLine1}
          </p>
          <p className="text-sm text-soft_mint mt-1">
            {address?.addressLine2 && `${address.addressLine2}, `}
            {address?.city}, {address?.state}
          </p>
          <p className="text-sm text-soft_mint mt-1 flex items-center gap-2">
            <Globe size={16} />
            {address?.country}
          </p>
          <p className="text-sm text-soft_mint mt-1 flex items-center gap-2">
            <Landmark size={16} />
            {address?.postalCode}
          </p>
        </div>
      </div>
    </>
  );
};
export default AddressItem;
