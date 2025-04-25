import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import signUpSchema, { signUpSchemaType } from "../../schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import Button from "../ui/Button";
import { registerUser } from "../../store/Slice/authSlice";
import signin from "../../assets/signin.png";

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signUpSchemaType> = async (data) => {
    try {
      const resultAction = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
      }
    } catch (err) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <img src={signin} alt="signup" className="w-2/3 md:w-2/4 h-auto mt-2" />
      <div className="w-full max-w-lg bg-soft_mint p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              placeholder="John"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile
            </label>
            <input
              type="tel"
              {...register("mobile")}
              placeholder="+1234567890"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <Button
            label="Sign Up"
            className="w-full bg-seabasket_green text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-800 transition"
          />
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
