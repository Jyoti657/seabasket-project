import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import signUpSchema, { signUpSchemaType } from "../../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { registerUser } from "../../store/Slice/authSlice";
import Button from "../ui/Button";

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<signUpSchemaType> = (data) => {
    dispatch(registerUser(data));
    console.log("User Data:", data);
    navigate("/");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen 
      bg-gray-100 px-4"
    >
      <div
        className="w-full bg-gradient-to-t from-seabasket_green
        max-w-md  p-6 rounded-lg shadow-md"
      >
        <h2
          className="text-2xl font-semibold text-center text-gray-800
          mb-6"
        >
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Full Name is required" })}
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            label="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          />
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
