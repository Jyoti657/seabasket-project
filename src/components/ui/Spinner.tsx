 const Spinner:React.FC=()=>{
    return(
        <div className="flex justify-center items-center h-screen">
            <svg
                className="animate-spin h-10 w-10 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"     
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" className="opacity-25" />
                <path d="M4 12a8 8 0 1 1 16 0" className="opacity-75" />
            </svg>
            <p className="text-gray-700 mt-4">Loading...</p>
        </div>
    )
 }
export default Spinner;