// import { useForm } from "react-hook-form";
// import Button from "../ui/Button";

// const LoginForm: React.FC = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const tel = watch("tel");
//   const email = watch("email");

//   const onSubmit = (data: any) => {
//     console.log(data);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-20 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
//       <div className="w-full md:w-1/2 bg-seabasket_green text-white flex flex-col justify-center items-start p-8">
//         <h1 className="text-4xl font-bold mb-2">Login</h1>
//         <p className="text-lg mb-1">Welcome back!</p>
//         <p className="text-sm text-gray-700">
//           Get access to your Orders, Wishlist, and Recommendations.
//         </p>
//       </div>

//       <div className="w-full md:w-1/2   p-8">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <input
//             {...register("tel")}
//             type="tel"
//             placeholder="Enter Phone Number"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//             pattern="^\d{10}$"
//           />

//           <input
//             {...register("email")}
//             type="email"
//             placeholder="Enter Email"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//           />


//           {email && (
//             <div>
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//                 type="password"
//                 placeholder="Enter Password"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               />
//             </div>
//           )}

//           <Button
//             label="Submit"
//             className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-200"
//           ></Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

const LoginForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone, "IN")) {
      setError("Please enter a valid Indian phone number.");
      return;
    }

    const formattedNumber = parsePhoneNumber(phone, "IN")?.formatInternational();

    console.log("Valid phone:", formattedNumber);
    // Send to backend API for OTP or login
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91 9876543210"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-seabasket_green hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
      >
        Send OTP
      </button>
    </form>
  );
};

export default LoginForm;
