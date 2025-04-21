// import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { profileSchemaType } from "../../schema/ProfileSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import profileSchema from "../../schema/ProfileSchema";
// import { addProfile } from "../../store/Slice/authSlice";

// const ProfileForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<profileSchemaType>({ resolver: zodResolver(profileSchema) });

//   // const onSubmit: SubmitHandler<profileSchemaType> = (data) => {
//   //   dispatch(addProfile(data));
//   // };

//   return (
//     <div className="w-full max-w-[800px] bg-white p-6 shadow-lg rounded-md items-center">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
//         Personal Information
//       </h2>

//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             {...register("name")}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             {...register("email")}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Phone
//           </label>
//           <input
//             type="text"
//             id="phone"
//             {...register("phone")}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-seabasket_green focus:border-seabasket_green"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-seabasket_green text-white py-2 rounded-md  transition duration-200"
//         >
//           Edit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;
