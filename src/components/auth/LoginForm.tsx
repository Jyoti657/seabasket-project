import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import logInSchema, { logInSchemaType } from "../../schema/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/Slice/authSlice";
import { useNavigate } from "react-router-dom";

import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import login from "../../assets/login .png";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.authError);
  const otp = useSelector((state: RootState) => state.auth.otpVerified);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInSchemaType>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<logInSchemaType> = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/otp");
      }
    } catch (err) {}
  };

 
  return (
    <div className="w-full max-w-5xl mx-auto mt-20 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-1/2 bg-soft_mint text-teal-800 flex flex-col justify-center items-center p-10 space-y-4">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-lg">Welcome back!</p>
        <p className="text-sm text-teal-800 text-center">
          Get access to your Orders, Wishlist, and Recommendations.
        </p>
        <img src={login} alt="Login" className="w-2/3 md:w-3/4 h-auto mt-4" />
      </div>

      <div className="w-full md:w-1/2 p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
            <MdMarkEmailUnread className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
            <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {authError && (
            <p className="text-red-600 text-sm mt-2">{authError}</p>
          )}
          {otp && (
            <p className="text-green-600 text-sm mt-2">OTP Send Successful!</p>
          )}

          <Button
            label="login"
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-950 transition duration-200"
          />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-teal-700 cursor-pointer hover:underline"
                onClick={() => navigate("/signUp")}
              >
                Sign Up
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span
                className="text-teal-700 cursor-pointer hover:underline"
                onClick={() => navigate("/forgotPassword")}
              >
                Forgot Password?
              </span>
          

            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
