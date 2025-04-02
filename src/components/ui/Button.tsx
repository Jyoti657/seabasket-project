import { ButtonProps } from "../../types"



const Button:React.FC<ButtonProps>=({label,onClick})=>{
    return (
        <>
        <button
        onClick={onClick}
        className="px-6 py-2 rounded-md transition text-black bg-seabasket_green"
        >
            {label}

        </button>
        </>
    )
}
  export default Button