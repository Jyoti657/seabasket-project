import { ForgetPasswordSchemaType } from "../../schema/forgetPasswordSchema";
import forgetPasswordSchema from "../../schema/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../store/Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const token = useSelector((state: RootState) => state.auth.reset);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: ForgetPasswordSchemaType) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  useEffect(() => {
    if (isSubmitted && token) {
      navigate(`/reset-password/${token}`);
    }
  }, [isSubmitted, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-seabasket_green">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-seabasket_green`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            label="Send Reset Link"
            type="submit"
            className="w-full bg-seabasket_green text-white py-2 rounded-md hover:bg-seabasket_green/90 transition duration-200"
          />
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
