import { useDispatch } from "react-redux";
import ProfileForm from "../components/profile/ProfileForm";
import { AppDispatch } from "../store/store";
import { CgProfile } from "react-icons/cg";
import { RiFileHistoryFill, RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Confirm from "../components/ui/ConfrimModal";
import { FaAddressCard } from "react-icons/fa";
import { logOut } from "../store/Slice/authSlice";
import ProfileCard from "../components/profile/ProfileCard";
import SideBarItem from "../components/profile/SideBarItem";

const Profile: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
              Hello, {"User"}
            </h2>
          </div>

          <SideBarItem
            onClick={handleOrderHistory}
            label="order Histroy"
            icon={<RiFileHistoryFill />}
            hoverBg="hover:bg-teal-700"
          />

          <SideBarItem
            onClick={handleAddress}
            label="Manage Addresses"
            icon={<FaAddressCard />}
            hoverBg="hover:bg-teal-700"

          />
          <SideBarItem
            icon={<RiLogoutCircleRFill size={32} />}
            label="Logout"
            onClick={() => setShowConfirm(true)}
            textColor="text-red-600"
            hoverBg="hover:bg-red-100"
          />
        </div>

        <div className="flex-1 space-y-6">
          <ProfileCard />

          <div className="bg-soft_mint shadow-md rounded-lg p-6 items-center">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
              Update Profile
            </h3>
            <ProfileForm />
          </div>
        </div>
      </div>

      <Confirm
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        OnConfirm={handleLogOut}
        message="Are you sure you want to logout?"
        ConfirmText="Yes, Logout"
        CancelText="Cancel"
      />
    </>
  );
};

export default Profile;
