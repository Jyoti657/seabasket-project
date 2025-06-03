import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch } from "../../store/store";
import { fetchAddress, updateAddress } from "../../store/Slice/addressSlice";
import addressSchema, { addressSchemaType } from "../../schema/addressSchema";
import BasedAddress from "./BasedAddress";

interface UpdateAddressFormProps {
  address: addressSchemaType & { id: string };
  onClose: () => void;
}

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({
  address,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const formMethods = useForm<addressSchemaType>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (address) {
      formMethods.reset({
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      });
    }
  }, [address, formMethods]);

  const onSubmit: SubmitHandler<addressSchemaType> = async (data) => {
    try {
      await dispatch(updateAddress({ id: address.id, updateaddress: data }));
      await dispatch(fetchAddress());
      onClose();
    } catch (error) {
      console.error(" Failed to update address:", error);
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

export default UpdateAddressForm;
