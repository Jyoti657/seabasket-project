import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

const ProfileCard:React.FC=()=>{
    const user=useSelector((state:RootState)=>state.auth.user)
    console.log("redux user",user)
    return(
        <>
         <div className="w-full lg:w-3/4 space-y-6">
         {user && (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
      Profile Details
    </h3>
    <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
      <p><span className="font-medium">First Name:</span> {user.firstName }</p>
      <p><span className="font-medium">Last Name:</span> {user.lastName }</p>
      <p><span className="font-medium">Mobile Number:</span> {user.mobile }</p>
      {user.address && (
        <>
          <p><span className="font-medium">Address Line 1:</span> {user.address.addressLine1}</p>
          <p><span className="font-medium">Address Line 2:</span> {user.address.addressLine2 }</p>
          <p><span className="font-medium">City:</span> {user.address.city }</p>
          <p><span className="font-medium">State:</span> {user.address.state }</p>
          <p><span className="font-medium">Postal Code:</span> {user.address.postalCode }</p>
        </>
      )}
    </div>
  </div>
)}


          
        </div>
        
        </>
    )
}
export default  ProfileCard