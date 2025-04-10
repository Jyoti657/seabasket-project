    import { useDispatch } from "react-redux"
    import { addressForm } from "../../types"
    import { AppDispatch } from "../../store/store"
    import { useForm } from "react-hook-form"
    import { setAddress } from "../../store/Slice/addressSlice"

    const AddressForm:React.FC=()=>{
    const dispatch=  useDispatch<AppDispatch>()
    const {register,handleSubmit, formState:{errors}}=useForm<addressForm>()
    const onSubmit=(data:any)=>{
        dispatch(setAddress(data));

    }
        return(
            <>
            
            <div className="w-full max-w-[800px] bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Shipping address
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
            >
                Name
            </label>
            <input
                type="text"
                id="name"
                {...register("fullname", { required: "Name is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.fullname && (
                <p className="text-red-500  text-sm mt-1">{errors.fullname.message}</p>
            )}
            </div>

            <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Phone
            </label>
            <input
                type="tel"
                id="tel"
                {...register("phoneNumber", { required: "Phone is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
            )}
            </div>
            <div>
            <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
            >
                state
            </label>
            <input
                type="text"
                id=""
                {...register("state", { required: "Phone number is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
            </div>

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
            Save Changes
            </button>
        </form>
        </div>
            </>
        )

    }
    export default AddressForm