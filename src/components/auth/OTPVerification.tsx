import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { verifyOtp } from "../../store/Slice/authSlice";
import otpSchema, { OtpSchemaType } from "../../schema/optSchema";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import password from "../../assets/password (1).png";

const OTPVerification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const otp = useSelector((state: RootState) => state.auth.otpVerified);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit: SubmitHandler<OtpSchemaType> = async (data) => {
    try {
      const resultAction = await dispatch(verifyOtp(data));
      if (verifyOtp.fulfilled.match(resultAction)) {
        console.log("OTP verified successfully");
        reset();
        navigate("/");
      } else {
        console.error("OTP verification failed");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
    }
  };
  const handleResendOtp = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-soft_mint rounded-xl shadow-md p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-seabasket_green">
          OTP Verification
        </h2>
        <img
          src={password}
          alt="OTP"
          className="w-3/4 md:2/3 h-auto items-center ml-10 "
        />

        <p className="text-center text-gray-600 font-semibold mb-6">
          Please enter the OTP sent to your email.
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-seabasket_green"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              One-Time Password
            </label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              {...register("otp")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-seabasket_green"
              }`}
              placeholder="Enter 6-digit OTP"
            />
            {errors.otp && (
              <p className="text-sm text-red-500 mt-1">{errors.otp.message}</p>
            )}
            {otp && <p className="text-sm text-green-500 mt-1">{otp}</p>}
          </div>

          <Button
            type="submit"
            label="Verify OTP"
            className="w-full bg-seabasket_green text-white font-semibold py-2 rounded-md hover:bg-teal-900 transition"
          />
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-seabasket_green font-semibold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
