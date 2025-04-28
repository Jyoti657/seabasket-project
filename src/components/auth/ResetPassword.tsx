import { useDispatch } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { resetPassword } from "../../store/Slice/authSlice";
import { useForm } from "react-hook-form";
import resetPasswordSchema, {
  resetPasswordSchemaType,
} from "../../schema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: resetPasswordSchemaType) => {
    try {
      if (!token) {
        console.error("Token is missing in the url");
        return;
      }

      const resultAction = await dispatch(
        resetPassword({ token: token || "", password: data.password })
      );
      if (resetPassword.fulfilled.match(resultAction)) {
        console.log("Password reset successfully");
        navigate("/login");
      } else {
        console.error("Failed to   resetPassword Try again");
      }
    } catch (error) {
      console.log("Error in the password valiadtion", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-seabasket_green"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-seabasket_green text-white py-2 rounded-md hover:bg-seabasket_green/90 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
