interface SideBarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  textColor?: string;
  hoverBg?: string;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  icon,
  label,
  onClick,
  textColor = "text-gray-700",
  hoverBg = "bg-gray-200",
}) => {
  return (
    <>
      <div
        className={`flex flex-col items-center text-center ${hoverBg} p-4 rounded-lg transition duration-200 cursor-pointer`}
        onClick={onClick}
      >
        <div className={`w-8 h-8 mb-1 ${textColor}`}>{icon}</div>
        <p className={`${textColor} font-medium`}>{label}</p>
      </div>
    </>
  );
};
export default SideBarItem;
