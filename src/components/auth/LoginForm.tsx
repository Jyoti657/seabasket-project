import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import logInSchema, { logInSchemaType } from "../../schema/logInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


const LoginForm: React.FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authError = useSelector((state: RootState) => state.auth.authError);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<logInSchemaType>({ resolver: zodResolver(logInSchema) });

  const onSubmit: SubmitHandler<logInSchemaType> = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password })
  );
  setHasSubmitted(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      reset();
      navigate("/");
    }
  }, [navigate, isAuthenticated, reset]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-seabasket_green text-white flex flex-col justify-center items-start p-8">
        <h1 className="text-4xl font-bold mb-2">Login</h1>
        <p className="text-lg mb-1">Welcome back!</p>
        <p className="text-sm text-gray-700">
          Get access to your Orders, Wishlist, and Recommendations.
        </p>
      </div>

      <div className="w-full md:w-1/2 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <MdMarkEmailUnread className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
              className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {hasSubmitted && authError && (
            <p className="text-red-600 text-sm mt-2">{authError}</p>
          )}

          {hasSubmitted && isAuthenticated && (
            <p className="text-green-600 text-sm mt-2">Login Successful</p>
          )}

          <Button
            label="Submit"
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-500 transition duration-200 mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
