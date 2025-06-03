import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import addressSchema, { addressSchemaType } from "../../schema/addressSchema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addAddress, fetchAddress } from "../../store/Slice/addressSlice";
import BasedAddress from "./BasedAddress";

interface AddressFormProps {
  onClose?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const formMethods = useForm<addressSchemaType>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<addressSchemaType> = async (data) => {
    try {
      await dispatch(addAddress(data));
      await dispatch(fetchAddress());
      onClose && onClose();
    } catch (error) {
      console.error("address is not added");
    }
  };

  return (
    <BasedAddress
      formMethods={formMethods}
      onSubmit={onSubmit}
      onCancel={onClose}
    />
  );
};

export default AddressForm;
