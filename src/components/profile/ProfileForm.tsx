import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { profileSchemaType } from "../../schema/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import profileSchema from "../../schema/ProfileSchema";
import { addProfile } from "../../store/Slice/authSlice";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileSchemaType>({ resolver: zodResolver(profileSchema) });

  const onSubmit: SubmitHandler<profileSchemaType> = (data) => {
    dispatch(addProfile(data));
  };

  return (
    <div className="w-full max-w-[800px] bg-white p-6 shadow-lg rounded-md items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Personal Information
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>

      
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>

        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-seabasket_green focus:border-seabasket_green"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex space-x-4">
            <div>
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender")}
                className="mr-2"
              />
              <label htmlFor="male" className="text-sm">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                value="female"
                {...register("gender")}
                className="mr-2"
              />
              <label htmlFor="female" className="text-sm">Female</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                value="other"
                {...register("gender")}
                className="mr-2"
              />
              <label htmlFor="other" className="text-sm">Other</label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

      
        <button
          type="submit"
          className="w-full bg-seabasket_green text-white py-2 rounded-md transition duration-200"
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
