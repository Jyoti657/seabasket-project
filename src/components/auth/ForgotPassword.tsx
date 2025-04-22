const ForgotPassword:React.FC=()=>{
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-seabasket_green">
                    Forgot Password
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Please enter your email to reset your password.
                </p>
                {/* Add your form here */}
                <form className="space-y-5">
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
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-seabasket_green`}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-seabasket_green text-white py-2 rounded-md hover:bg-seabasket_green/90 transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </form> 
            </div>
        </div>
    )
}
export default ForgotPassword;