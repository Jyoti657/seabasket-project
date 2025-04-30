import forgetPasswordSchema,{ ForgetPasswordSchemaType } from "../../schema/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../store/Slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { reset} = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    useEffect(() => {
      const token = reset;
      if (token) {
        navigate(`reset-password/${token}`);
      }
    }, [reset]);
    
    
  },[reset  ])
  const onSubmit = async (data: ForgetPasswordSchemaType) => {
    try {
      const resultAction = await dispatch(forgotPassword(data));
      if (forgotPassword.fulfilled.match(resultAction)) {
        console.log("Password reset link sent successfully");
      } else {
        console.error("Failed to send password reset link");
      }

      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };
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
