import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { setUser } from "../../store/Slice/userSlice"

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  })

  const onSubmit = (data: any) => {
    dispatch(setUser(data))
    console.log(data)
  }

  return (
    <div className="w-full max-w-[800px] bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Personal Information
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
  
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

    
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
  )
}

export default ProfileForm
