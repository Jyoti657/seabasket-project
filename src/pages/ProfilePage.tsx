import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/profile/ProfileForm";
import { AppDispatch, RootState } from "../store/store";
import { CgProfile } from "react-icons/cg";
import { RiFileHistoryFill, RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Confirm from "../components/ui/ConfrimModal";
import { FaAddressCard } from "react-icons/fa";
import { logOut } from "../store/Slice/authSlice";

const Profile: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth.user);

  const handleOrderHistory = () => {
    navigate("/order");
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  const handleAddress = () => {
    navigate("/address");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row px-4 py-6 gap-6">
        <div className="w-full bg-gradient-to-t from-seabasket_green lg:w-1/4 shadow-lg rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center text-center">
            <CgProfile className="w-16 h-16 text-gray-500 mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Hello, {auth?.name || "User"}
            </h2>
          </div>

          <div
            className="flex flex-col items-center text-center hover:bg-gray-100 p-4 rounded-lg transition duration-200 cursor-pointer"
            onClick={handleOrderHistory}
          >
            <RiFileHistoryFill className="w-8 h-8 text-gray-700 mb-1" />
            <p className="text-gray-700 font-medium">Order History</p>
          </div>
          <div
            className="flex flex-col items-center text-center hover:bg-gray-100 p-4 rounded-lg transition duration-200 cursor-pointer"
            onClick={handleAddress}
          >
            <FaAddressCard className="w-8 h-8 text-gray-700 mb-1" />
            <p className="text-gray-700  font-medium">Manage Addressess</p>
          </div>

          <div
            className="flex flex-col items-center text-center hover:bg-red-100 p-4 rounded-lg transition duration-200 cursor-pointer"
            onClick={() => setShowConfirm(true)}
          >
            <RiLogoutCircleRFill className="w-8 h-8 text-red-600 mb-1" />
            <p className="text-red-600 font-medium">Logout</p>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-6">
          {auth && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                Profile Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span> {auth.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {auth.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {auth.phone}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              Update Profile
            </h3>
            <ProfileForm />
          </div>
        </div>
      </div>

      <Confirm
        isOpne={showConfirm}
        onClose={() => setShowConfirm(false)}
        OnConfrim={handleLogOut}
        message="Are you sure you want to logout?"
        ConfirmText="Yes, Logout"
        CancelText="Cancel"
      />
    </>
  );
};

export default Profile;
