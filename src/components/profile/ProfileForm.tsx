import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { ProfileSchemaType } from "../../schema/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import profileSchema from "../../schema/ProfileSchema";
import { updateProfile } from "../../store/Slice/authSlice";
import Button from "../ui/Button";
import TextInput from "./InputProfile";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({ resolver: zodResolver(profileSchema) });

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
    try {
      await dispatch(updateProfile(data));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="w-full max-w-[800px] bg-white p-6 shadow-lg rounded-md items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Personal Information
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="firstName"
          label="FirstName"
          register={register}
          error={errors.firstName}
        />
        <TextInput
          id="lastName"
          label="LastName"
          register={register}
          error={errors.lastName}
        />
        <TextInput
          id="mobile"
          label="Mobile Number"
          register={register}
          error={errors.mobile}
        />
        <Button
          type="submit"
          className="w-full bg-seabasket_green text-white py-2 rounded-md transition duration-200"
          label="Edit Profile"
        />
      </form>
    </div>
  );
};

export default ProfileForm;
